<template>
  <nav class="tabbar engrave-frame">
    <router-link
      v-for="t in tabs"
      :key="t.name"
      :to="t.to"
      class="tab"
      :class="{ active: isActive(t) }"
    >
      <span class="ico" v-html="t.icon"></span>
      <span class="lbl">{{ t.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// 4个Tab（图鉴/酒单同级）— PRD 3.2
const tabs = [
  { name: 'home', to: '/', label: '首页', match: ['home', 'shelf', 'confirm'], icon: '🌿' },
  { name: 'mine', to: '/mine', label: '图鉴', match: ['mine', 'path', 'result'], icon: '📖' },
  { name: 'menu', to: '/menu', label: '酒单', match: ['menu', 'menu-edit'], icon: '🥃' },
  { name: 'settings', to: '/settings', label: '我的', match: ['settings', 'export'], icon: '🕯️' }
]

function isActive(t) {
  return t.match.includes(route.name)
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  background: #f1e7cc;
  padding: 8px 0 10px;
  z-index: 50;
}
.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--slate);
  font-size: 12px;
  transition: color 0.3s ease, transform 0.3s ease;
}
.tab .ico {
  font-size: 20px;
  filter: grayscale(0.6) opacity(0.7);
}
.tab.active {
  color: var(--amber);
  transform: translateY(-2px);
}
.tab.active .ico {
  filter: none;
  animation: pop 0.4s ease;
}
@keyframes pop {
  0% {
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
