<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { bar, plants, plantsFor } from '../data/menu'
import PlantArt from '../components/PlantArt.vue'

const router = useRouter()
const showQR = ref(false)

function primaryPlant(w) {
  return plants[plantsFor(w.region, w.plants)[0]]
}
function addNew() {
  const id = 'new-' + Date.now()
  store.add({
    id,
    name: 'New Whisky',
    cn: '新酒款',
    region: 'Highland',
    cask: 'Oak',
    age: '12',
    abv: '43.0',
    cup: 100,
    bottle: 800,
    plants: [],
    template: 'curtis',
    available: true,
    flavor: { nose: ['—'], palate: ['—'], finish: ['—'] },
    note: '点击编辑，填入这瓶酒的故事。'
  })
  router.push(`/admin/edit/${id}`)
}
</script>

<template>
  <div class="page">
    <button class="link-back font-fell" @click="router.push('/')">← 返回</button>

    <header class="head">
      <span class="eyebrow font-fell">MANAGEMENT · 商家后台</span>
      <h1 class="bar-name font-title">{{ bar.name }}</h1>
      <p class="bar-cn font-body">{{ bar.cn }} · {{ bar.city }}</p>
      <div class="stats">
        <span><strong>{{ store.list.length }}</strong> 在册</span>
        <span class="dot">·</span>
        <span><strong>{{ store.available.length }}</strong> 上架</span>
        <span class="dot">·</span>
        <span>编号 <strong>{{ bar.code }}</strong></span>
      </div>
    </header>

    <div class="toolbar">
      <button class="btn moss" @click="addNew">+ 添加酒款</button>
      <button class="btn-ghost" @click="store.reset()">批量导入</button>
    </div>

    <hr class="rule-fancy">❦</hr>

    <ul class="list">
      <li
        v-for="(w, i) in store.list"
        :key="w.id"
        class="row card"
        :class="{ off: !w.available }"
      >
        <div class="thumb">
          <PlantArt :kind="primaryPlant(w).kind" color="#4A6B3A" :size="48" />
        </div>
        <div class="info" @click="router.push(`/admin/edit/${w.id}`)">
          <div class="info-top">
            <span class="r-name font-title">{{ w.name }}</span>
            <span class="r-price price">¥{{ w.cup }}</span>
          </div>
          <span class="r-latin font-latin">{{ primaryPlant(w).latin }}</span>
          <span class="r-meta font-body">{{ w.cn }} · {{ w.cask }} · {{ w.region }}</span>
        </div>
        <div class="ops">
          <div class="reorder">
            <button @click="store.move(w.id, -1)" :disabled="i === 0">▲</button>
            <button @click="store.move(w.id, 1)" :disabled="i === store.list.length - 1">▼</button>
          </div>
          <label class="switch">
            <input type="checkbox" :checked="w.available" @change="store.toggle(w.id)" />
            <span class="slider"></span>
          </label>
          <div class="quick">
            <button class="q font-fell" @click="router.push(`/admin/generate/${w.id}`)">换风格</button>
            <button class="q font-fell" @click="router.push(`/admin/export/${w.id}`)">导出</button>
          </div>
        </div>
      </li>
    </ul>

    <div class="footer-acts">
      <button class="btn amber" @click="showQR = true">查看酒单链接 · 小程序码</button>
    </div>

    <!-- 小程序码弹层 -->
    <transition name="page">
      <div v-if="showQR" class="qr-overlay" @click="showQR = false">
        <div class="qr-card card" @click.stop>
          <span class="font-fell qr-title">SCAN · 贴在桌上</span>
          <div class="qr">
            <div v-for="n in 144" :key="n" class="qr-cell" :class="{ on: (n * 7 + (n % 5) * 3) % 3 === 0 }"></div>
          </div>
          <p class="font-title qr-bar">{{ bar.name }}</p>
          <p class="font-body qr-link">herbarium.bar/m/{{ bar.code.toLowerCase() }}</p>
          <button class="btn moss" @click="router.push('/menu')">预览客人视图 →</button>
          <button class="btn-ghost" @click="showQR = false">关闭</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.link-back {
  background: none;
  border: none;
  color: var(--oak);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;
}
.head {
  margin-bottom: 16px;
}
.eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--slate);
}
.bar-name {
  font-size: 30px;
  font-weight: 600;
  color: var(--oak);
  margin: 2px 0;
}
.bar-cn {
  font-size: 13px;
  color: var(--ink);
}
.stats {
  font-size: 13px;
  color: var(--ink);
  margin-top: 8px;
}
.stats strong { color: var(--moss); }
.stats .dot { color: var(--dried); margin: 0 6px; }

.toolbar {
  display: flex;
  gap: 10px;
}
.toolbar .btn { flex: 1; }

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.row {
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: stretch;
  transition: opacity 0.3s;
}
.row.off { opacity: 0.5; }
.thumb {
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px dashed var(--dried);
  flex-shrink: 0;
}
.info {
  flex: 1;
  min-width: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.info-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6px;
}
.r-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.r-price { font-size: 16px; flex-shrink: 0; }
.r-latin { font-size: 13px; color: var(--moss); }
.r-meta {
  font-size: 11px;
  color: var(--slate);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ops {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  flex-shrink: 0;
}
.reorder {
  display: flex;
  flex-direction: column;
}
.reorder button {
  background: none;
  border: none;
  color: var(--oak);
  font-size: 10px;
  cursor: pointer;
  line-height: 1.1;
  padding: 0 4px;
}
.reorder button:disabled { color: var(--dried); opacity: 0.4; }

.switch {
  position: relative;
  width: 38px;
  height: 20px;
  display: inline-block;
}
.switch input { display: none; }
.slider {
  position: absolute;
  inset: 0;
  background: var(--dried);
  border-radius: 10px;
  transition: 0.2s;
}
.slider::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  left: 2px;
  top: 2px;
  background: var(--parchment);
  border-radius: 50%;
  transition: 0.2s;
}
.switch input:checked + .slider { background: var(--moss); }
.switch input:checked + .slider::before { transform: translateX(18px); }

.quick {
  display: flex;
  gap: 4px;
}
.q {
  background: none;
  border: 1px solid var(--oak);
  border-radius: 2px;
  color: var(--oak);
  font-size: 11px;
  padding: 2px 6px;
  cursor: pointer;
}

.footer-acts {
  margin-top: 20px;
}
.footer-acts .btn { width: 100%; }

.qr-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}
.qr-card {
  background: var(--parchment);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 300px;
  width: 100%;
}
.qr-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--slate);
}
.qr {
  width: 168px;
  height: 168px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border: 6px solid var(--parchment);
  outline: 1px solid var(--oak);
  background: #fffdf5;
}
.qr-cell { background: transparent; }
.qr-cell.on { background: var(--ink); }
.qr-bar { font-size: 18px; color: var(--oak); margin: 2px 0 0; }
.qr-link { font-size: 12px; color: var(--slate); margin: 0 0 6px; }
.qr-card .btn,
.qr-card .btn-ghost { width: 100%; }
</style>
