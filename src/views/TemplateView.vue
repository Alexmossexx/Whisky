<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findWhisky, templates } from '../data/whiskies'
import { store } from '../store'
import BackBar from '../components/BackBar.vue'

const route = useRoute()
const router = useRouter()
const w = computed(() => findWhisky(route.params.id))

const idx = ref(templates.findIndex((t) => t.id === store.selectedTemplate))
if (idx.value < 0) idx.value = 0
const current = computed(() => templates[idx.value])
const notes = ref(store.userNotes)

function prev() {
  idx.value = (idx.value - 1 + templates.length) % templates.length
}
function nextTpl() {
  idx.value = (idx.value + 1) % templates.length
}

function alchemize() {
  store.selectedTemplate = current.value.id
  store.userNotes = notes.value.trim()
  router.push(`/result/${w.value.id}`)
}
</script>

<template>
  <div class="page">
    <BackBar title="SELECT STYLE" />

    <!-- 3D 旋转预览卡 -->
    <div class="stage">
      <transition name="flip" mode="out-in">
        <div
          :key="current.id"
          class="preview brushed"
          :style="{ background: current.bg, '--ac': current.accent }"
        >
          <div class="pv-scan"></div>
          <span class="pv-name font-display" :style="{ color: current.accent }">{{
            current.name
          }}</span>
          <span class="pv-cn">{{ current.cn }}</span>
          <div class="pv-mock">
            <div class="mock-glass" :style="{ borderColor: current.accent }"></div>
            <div class="mock-bars">
              <span :style="{ background: current.accent }"></span>
              <span :style="{ background: current.accent, width: '60%' }"></span>
              <span :style="{ background: current.accent, width: '80%' }"></span>
            </div>
          </div>
          <span class="pv-desc label-mono">{{ current.desc }}</span>
        </div>
      </transition>
    </div>

    <!-- 切换 -->
    <div class="switcher">
      <button class="arrow" @click="prev">◀</button>
      <div class="sw-name">
        <span class="font-display">{{ current.name }}</span>
        <span class="label-mono">{{ current.scene }}</span>
      </div>
      <button class="arrow" @click="nextTpl">▶</button>
    </div>

    <!-- 圆点 -->
    <div class="dots">
      <span v-for="(t, i) in templates" :key="t.id" :class="{ on: i === idx }"></span>
    </div>

    <!-- 感受输入 -->
    <div class="notes-wrap">
      <span class="label-mono">YOUR NOTES (OPTIONAL)</span>
      <textarea
        v-model="notes"
        class="notes"
        rows="2"
        placeholder="写下你的味觉印象… 它将被炼入图鉴"
      ></textarea>
    </div>

    <button class="btn-chrome cta" @click="alchemize">► ALCHEMIZE</button>
  </div>
</template>

<style scoped>
.stage {
  perspective: 800px;
  display: flex;
  justify-content: center;
  margin: 8px 0 24px;
}
.preview {
  width: 220px;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  border: 1px solid rgba(201, 168, 76, 0.45);
  transform: rotateY(-8deg) rotateX(3deg);
  box-shadow: var(--glow-gold);
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.pv-scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0, transparent 2px, transparent 4px);
  pointer-events: none;
}
.pv-name {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-shadow: 0 0 12px currentColor;
}
.pv-cn {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.2em;
  margin: 6px 0;
}
.pv-mock {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
.mock-glass {
  width: 44px;
  height: 50px;
  border: 2px solid;
  border-top: none;
  border-radius: 0 0 22px 22px;
  box-shadow: 0 0 16px var(--ac);
}
.mock-bars {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mock-bars span {
  height: 5px;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 0 8px var(--ac);
  opacity: 0.8;
}
.pv-desc {
  color: rgba(255, 255, 255, 0.55);
  font-size: 9px;
}

.switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 14px;
}
.arrow {
  background: none;
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 3px;
  color: #c9a84c;
  width: 38px;
  height: 38px;
  font-size: 14px;
  cursor: pointer;
}
.arrow:active {
  border-color: #00ffd1;
  color: #00ffd1;
  box-shadow: var(--glow-acid);
}
.sw-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 150px;
}
.sw-name .font-display {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.1em;
}
.sw-name .label-mono {
  color: #6a6a6a;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
}
.dots span {
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: #2a2a2a;
  transition: all 0.2s;
}
.dots span.on {
  background: #00ffd1;
  box-shadow: 0 0 8px #00ffd1;
  width: 18px;
}

.notes-wrap {
  margin-bottom: 24px;
}
.notes-wrap .label-mono {
  display: block;
  margin-bottom: 10px;
}
.notes {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.4);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  padding: 8px 0;
  outline: none;
  resize: none;
}
.notes::placeholder {
  color: #4a4a4a;
}
.notes:focus {
  border-color: #00ffd1;
}
.cta {
  width: 100%;
  font-size: 15px;
}

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
}
.flip-enter-from {
  transform: rotateY(60deg);
  opacity: 0;
}
.flip-leave-to {
  transform: rotateY(-60deg);
  opacity: 0;
}
</style>
