<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findWhisky } from '../data/whiskies'
import { store } from '../store'
import TastingCard from '../components/TastingCard.vue'
import BackBar from '../components/BackBar.vue'

const route = useRoute()
const router = useRouter()
const w = computed(() => findWhisky(route.params.id))

const phase = ref('forging') // forging → ready
const flipping = ref(false)
const fullscreen = ref(false)
const progress = ref(0)
const savedFlash = ref(false)

// 炼金（生图）模拟进度
onMounted(() => {
  const timer = setInterval(() => {
    progress.value += Math.random() * 18
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer)
      setTimeout(() => (phase.value = 'ready'), 350)
    }
  }, 220)
})

// 卡牌翻转 ×2 → 放大 (PRD §4.7)
function tapCard() {
  if (flipping.value) return
  flipping.value = true
  setTimeout(() => {
    flipping.value = false
    fullscreen.value = true
  }, 950)
}

function save() {
  store.addToCollection({
    id: w.value.id,
    name: w.value.name,
    cn: w.value.cn,
    score: w.value.score,
    accent: w.value.accent,
    template: store.selectedTemplate,
    notes: store.userNotes,
    ts: Date.now()
  })
  savedFlash.value = true
  setTimeout(() => (savedFlash.value = false), 1400)
}

function share() {
  const text = `${w.value.name} · ${w.value.score}/100 — 炼于 WHISKY ALCHEMY`
  if (navigator.share) navigator.share({ title: 'WHISKY ALCHEMY', text }).catch(() => {})
  else {
    navigator.clipboard?.writeText(text)
    savedFlash.value = true
    setTimeout(() => (savedFlash.value = false), 1400)
  }
}
</script>

<template>
  <div class="page">
    <BackBar />

    <!-- 炼金中 -->
    <div v-if="phase === 'forging'" class="forge">
      <div class="forge-ring">
        <div class="ring r1"></div>
        <div class="ring r2"></div>
        <div class="ring r3"></div>
        <span class="forge-pct font-mono">{{ Math.round(progress) }}%</span>
      </div>
      <span class="forge-label brand-title">ALCHEMIZING</span>
      <span class="label-mono">豆包 SEEDREAM · 风味炼化中…</span>
    </div>

    <!-- 成品 -->
    <div v-else class="result">
      <div
        class="card-stage"
        :class="{ flipping }"
        @click="tapCard"
      >
        <TastingCard :whisky="w" :template-id="store.selectedTemplate" :notes="store.userNotes" />
      </div>

      <p class="hint label-mono">TAP TO PREVIEW · 点击翻转放大</p>

      <div class="actions">
        <button class="btn-chrome act" @click="save">▼ SAVE</button>
        <button class="btn-chrome act" @click="share">⇄ SHARE</button>
        <button class="btn-ghost act" @click="router.push(`/template/${w.id}`)">⟳ STYLE</button>
        <button class="btn-ghost act" @click="router.push(`/confirm/${w.id}`)">✎ EDIT</button>
      </div>
    </div>

    <!-- 全屏预览 -->
    <transition name="zoom">
      <div v-if="fullscreen" class="fullscreen" @click="fullscreen = false">
        <div class="fs-card" @click.stop>
          <TastingCard :whisky="w" :template-id="store.selectedTemplate" :notes="store.userNotes" />
        </div>
        <span class="fs-close label-mono">点击空白处关闭</span>
      </div>
    </transition>

    <!-- 保存提示 -->
    <transition name="fade">
      <div v-if="savedFlash" class="toast">✓ 已炼入图鉴</div>
    </transition>
  </div>
</template>

<style scoped>
.forge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 60vh;
}
.forge-ring {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}
.r1 {
  inset: 0;
  border-top-color: #c9a84c;
  border-right-color: #c9a84c;
  animation: spin 1.4s linear infinite;
}
.r2 {
  inset: 18px;
  border-bottom-color: #00ffd1;
  border-left-color: #00ffd1;
  animation: spin 1.8s linear infinite reverse;
}
.r3 {
  inset: 36px;
  border-top-color: #8b5cf6;
  animation: spin 1.1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.forge-pct {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}
.forge-label {
  font-size: 22px;
  letter-spacing: 0.25em;
}
.forge .label-mono {
  color: #6a6a6a;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-stage {
  width: 100%;
  max-width: 320px;
  perspective: 1200px;
  cursor: pointer;
}
.card-stage > :deep(.tcard) {
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}
.card-stage.flipping > :deep(.tcard) {
  animation: flip2 0.95s ease-in-out;
}
@keyframes flip2 {
  0% {
    transform: rotateY(0);
  }
  42% {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  92%,
  100% {
    transform: rotateY(360deg);
  }
}
.hint {
  margin: 18px 0 22px;
  color: #6a6a6a;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}
.act {
  font-size: 13px;
  padding: 14px;
}

.fullscreen {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.96);
  background-image: radial-gradient(rgba(0, 255, 209, 0.05) 1px, transparent 1px);
  background-size: 26px 26px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 20px;
}
.fs-card {
  width: 86%;
  max-width: 360px;
}
.fs-close {
  color: #6a6a6a;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.3s ease;
}
.zoom-enter-active .fs-card,
.zoom-leave-active .fs-card {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}
.zoom-enter-from .fs-card,
.zoom-leave-to .fs-card {
  transform: scale(0.6);
}

.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 255, 209, 0.12);
  border: 1px solid rgba(0, 255, 209, 0.5);
  color: #00ffd1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 12px 22px;
  border-radius: 3px;
  box-shadow: var(--glow-acid);
  z-index: 110;
}
</style>
