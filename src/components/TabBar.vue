<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'HOME', to: '/', match: ['home'] },
  { name: 'SEARCH', to: '/cabinet', match: ['cabinet', 'confirm', 'template', 'result'] },
  { name: 'ME', to: '/collection', match: ['collection'] }
]

function isActive(t) {
  return t.match.includes(route.name)
}
</script>

<template>
  <nav class="tabbar">
    <button
      v-for="t in tabs"
      :key="t.name"
      class="tab"
      :class="{ active: isActive(t) }"
      @click="router.push(t.to)"
    >
      <span class="dot"></span>
      <span class="lbl">{{ t.name }}</span>
    </button>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 0 calc(14px + env(safe-area-inset-bottom));
  /* 毛玻璃 */
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(201, 168, 76, 0.2);
  z-index: 50;
}
.tab {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #4a4a4a;
  transition: all 0.2s ease;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: #4a4a4a;
  transition: all 0.2s ease;
}
.tab.active {
  color: #00ffd1;
  text-shadow: 0 0 10px rgba(0, 255, 209, 0.6);
  transform: translateY(-2px);
}
.tab.active .dot {
  background: #00ffd1;
  box-shadow: 0 0 12px rgba(0, 255, 209, 0.9);
  transform: scale(1.4);
}
</style>
