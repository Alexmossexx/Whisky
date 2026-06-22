<script setup>
import { useRouter } from 'vue-router'
import { store } from '../store'
import PlantArt from '../components/PlantArt.vue'
import { bar as barInfo } from '../data/menu'

const router = useRouter()
</script>

<template>
  <div class="page landing">
    <div class="crest bloom">
      <PlantArt kind="oak" color="#4A6B3A" :size="86" />
    </div>

    <h1 class="title font-title bloom">HERBARIUM</h1>
    <p class="sub font-fell bloom">威 士 忌 植 物 酒 单</p>
    <p class="latin font-latin bloom">Vinum · Herba · Terra</p>

    <hr class="rule-fancy demo-rule">❦</hr>

    <p class="intro font-body">
      每一瓶威士忌，都是土地写给人的一封植物信。<br />
      下面是一份可交互的演示酒单。
    </p>

    <div class="doors">
      <button class="door card bloom" @click="router.push('/admin')">
        <span class="door-icon font-fell">❦</span>
        <span class="door-name font-title">商家后台</span>
        <span class="door-desc font-body">管理酒柜 · 生成图鉴 · 导出视频</span>
        <span class="door-go font-fell">FOR THE OWNER →</span>
      </button>

      <button class="door card bloom" @click="router.push('/menu')" style="animation-delay: .12s">
        <span class="door-icon font-fell">⚇</span>
        <span class="door-name font-title">扫码看酒单</span>
        <span class="door-desc font-body">客人视角 · 翻阅会动的植物图鉴</span>
        <span class="door-go font-fell">FOR THE GUEST →</span>
      </button>
    </div>

    <div class="bar-note specimen">
      <span class="font-fell">DEMO BAR</span>
      <strong class="font-title">{{ barInfo.name }}</strong>
      <span class="font-body">{{ barInfo.cn }} · 共 {{ store.list.length }} 瓶在册</span>
    </div>
  </div>
</template>

<style scoped>
.landing {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.crest {
  margin-top: 18px;
}
.title {
  font-size: 42px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--oak);
  margin: 6px 0 0;
}
.sub {
  font-size: 16px;
  letter-spacing: 0.5em;
  color: var(--moss);
  margin: 8px 0 2px;
}
.latin {
  color: var(--slate);
  font-size: 16px;
  margin: 0;
}
.demo-rule {
  width: 70%;
  margin: 22px auto;
  color: var(--dried);
}
.intro {
  color: var(--ink);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 24px;
}
.doors {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.door {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.door:active {
  transform: translateY(2px);
  box-shadow: 0 4px 14px rgba(92, 61, 46, 0.12);
}
.door-icon {
  font-size: 26px;
  color: var(--moss);
}
.door-name {
  font-size: 23px;
  font-weight: 600;
  color: var(--oak);
}
.door-desc {
  font-size: 13px;
  color: var(--slate);
}
.door-go {
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--amber);
  margin-top: 4px;
}
.bar-note {
  margin-top: 26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
}
.bar-note span:first-child {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--slate);
}
.bar-note strong {
  font-size: 17px;
  color: var(--oak);
}
.bar-note span:last-child {
  font-size: 12px;
  color: var(--ink);
}
</style>
