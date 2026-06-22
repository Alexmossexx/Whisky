<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()
const items = computed(() => store.collection)

function open(it) {
  router.push(`/result/${it.id}`)
}
function remove(ts, e) {
  e.stopPropagation()
  store.removeFromCollection(ts)
}
</script>

<template>
  <div class="page">
    <header class="head rise">
      <h1 class="brand-title c-title">MY ALCHEMY</h1>
      <span class="count font-mono">({{ items.length }})</span>
    </header>

    <div v-if="items.length" class="grid">
      <div
        v-for="(it, i) in items"
        :key="it.ts"
        class="cell panel brushed rise"
        :style="{ animationDelay: i * 0.05 + 's', '--ac': it.accent }"
        @click="open(it)"
      >
        <button class="del" @click="remove(it.ts, $event)">✕</button>
        <div class="cell-art">
          <div class="cell-glass"></div>
          <div class="cell-glow"></div>
        </div>
        <div class="cell-foot">
          <span class="cell-name font-display">{{ it.name }}</span>
          <span class="cell-score font-mono">{{ it.score }}<small>/100</small></span>
        </div>
      </div>
    </div>

    <div v-else class="void-state panel brushed rise">
      <div class="void-bottle"></div>
      <span class="void-text brand-title">VOID</span>
      <span class="label-mono">图鉴库为空 · 去酒窖炼一张吧</span>
      <button class="btn-ghost" @click="router.push('/cabinet')">ENTER THE VAULT →</button>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 8px 0 26px;
}
.c-title {
  font-size: 32px;
  letter-spacing: 0.14em;
}
.count {
  color: #00ffd1;
  font-size: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.cell {
  --ac: #c9a84c;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cell:active {
  transform: translateY(-5px);
  box-shadow: var(--shadow-3d);
}
.del {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 3;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.6);
  color: #8b5cf6;
  font-size: 11px;
  cursor: pointer;
}
.cell-art {
  aspect-ratio: 1;
  position: relative;
  background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cell-glass {
  width: 38px;
  height: 44px;
  border: 2px solid var(--ac);
  border-top: none;
  border-radius: 0 0 19px 19px;
  box-shadow: 0 0 16px var(--ac);
  z-index: 2;
}
.cell-glow {
  position: absolute;
  width: 70px;
  height: 70px;
  background: radial-gradient(circle, var(--ac), transparent 70%);
  opacity: 0.3;
  filter: blur(8px);
}
.cell-foot {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
}
.cell-name {
  font-size: 12px;
  color: #fff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell-score {
  color: var(--ac);
  font-size: 13px;
  font-weight: 700;
}
.cell-score small {
  opacity: 0.5;
  font-size: 9px;
}

.void-state {
  padding: 48px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
}
.void-bottle {
  width: 26px;
  height: 50px;
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 3px 3px 5px 5px;
  position: relative;
  opacity: 0.6;
  animation: dissolve 3s ease-in-out infinite;
}
.void-bottle::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: rgba(139, 92, 246, 0.5);
}
@keyframes dissolve {
  0%,
  100% {
    opacity: 0.6;
    filter: blur(0);
  }
  50% {
    opacity: 0.2;
    filter: blur(2px);
  }
}
.void-text {
  font-size: 30px;
  letter-spacing: 0.3em;
}
.void-state .label-mono {
  color: #6a6a6a;
}
</style>
