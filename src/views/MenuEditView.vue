<template>
  <div class="anim-wash" v-if="menu">
    <AppHeader title="编辑酒单" back />
    <div class="px">
      <label class="lbl">酒单名称</label>
      <input v-model="menu.name" class="inp" @change="persist" />

      <label class="lbl">简介</label>
      <textarea v-model="menu.description" class="inp" rows="2" @change="persist"></textarea>

      <!-- AI 生成 Logo -->
      <label class="lbl">Logo（AI 生成 · Seedream）</label>
      <div class="logo-box specimen-label">
        <div class="logo-current">
          <img v-if="menu.logo_url" :src="menu.logo_url" class="logo-img" />
          <div v-else class="logo-img placeholder">🌿</div>
          <div class="logo-meta">
            <div>{{ menu.logo_url ? '当前 Logo' : '尚未生成' }}</div>
            <div class="latin">{{ styleLabel }}</div>
          </div>
        </div>
        <div class="style-pick">
          <button
            v-for="s in logoStyles"
            :key="s.key"
            class="style-btn"
            :class="{ on: style === s.key }"
            @click="style = s.key"
          >
            {{ s.label }}
          </button>
        </div>
        <button class="btn-amber" @click="genLogo" :disabled="logoLoading">
          {{ logoLoading ? '生成中…' : menu.logo_url ? '🔄 AI 重新生成' : '🌿 AI 生成 Logo' }}
        </button>
        <div v-if="candidates.length" class="candidates">
          <img
            v-for="c in candidates"
            :key="c.seed"
            :src="c.url"
            class="cand"
            @click="applyLogo(c)"
          />
        </div>
      </div>

      <!-- 酒款列表 -->
      <label class="lbl">酒款列表（{{ menu.bottles.length }}）</label>
      <div v-if="menu.bottles.length" class="bottles">
        <div
          v-for="(b, i) in menu.bottles"
          :key="b.card_id"
          class="bottle specimen-label"
          :class="{ off: b.status === 'off' }"
        >
          <div class="b-info">
            <div class="b-name font-bottle">{{ b.card.name_cn || b.card.whisky_name }}</div>
            <div class="latin">{{ b.card.latin }}</div>
          </div>
          <div class="b-price">
            <input v-model.number="b.cup_price" class="price-inp" @change="persist" />
            <span>元/杯</span>
          </div>
          <div class="b-ops">
            <button @click="move(i, -1)">↑</button>
            <button @click="move(i, 1)">↓</button>
            <button @click="toggle(b)">{{ b.status === 'off' ? '上架' : '下架' }}</button>
            <button @click="removeB(b)">✕</button>
          </div>
        </div>
      </div>
      <div v-else class="empty specimen-label">暂无酒款</div>

      <button class="btn-oak add" @click="showAdd = true">+ 添加酒款（从图鉴选择）</button>
      <button class="btn-amber save" @click="saveAndExit">→ 保存酒单</button>
    </div>

    <!-- 添加酒款 -->
    <div v-if="showAdd" class="sheet-mask" @click.self="showAdd = false">
      <div class="sheet specimen-label">
        <div class="sheet-title font-bottle">从「我的图鉴」选择</div>
        <div v-if="!cards.length" class="empty">还没有品鉴卡，先去生成</div>
        <div
          v-for="c in cards"
          :key="c.id"
          class="add-opt card-press"
          @click="addB(c)"
        >
          <img :src="c.image_url" class="add-thumb" />
          <span>{{ c.name_cn || c.whisky_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useMenuStore, useCardStore } from '../store'
import { generateLogo } from '../services/api'
import { LOGO_STYLES } from '../data/mock'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const cardStore = useCardStore()
const logoStyles = LOGO_STYLES

const menu = computed(() => menuStore.byId(route.params.id))
const cards = computed(() => cardStore.cards)

const style = ref('engraving')
const candidates = ref([])
const logoLoading = ref(false)
const showAdd = ref(false)

const styleLabel = computed(() => LOGO_STYLES.find((s) => s.key === menu.value?.logo_style)?.label || '')

function persist() {
  menuStore.persist()
}
async function genLogo() {
  logoLoading.value = true
  candidates.value = await generateLogo(menu.value.name, style.value)
  logoLoading.value = false
  showToast('已生成 3 个候选，点击选用')
}
function applyLogo(c) {
  menuStore.update(menu.value.id, { logo_url: c.url, logo_style: c.style })
  candidates.value = []
  showToast('Logo 已应用')
}
function move(i, dir) {
  const arr = [...menu.value.bottles]
  const j = i + dir
  if (j < 0 || j >= arr.length) return
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
  menuStore.reorder(menu.value.id, arr)
}
function toggle(b) {
  menuStore.toggleStatus(menu.value.id, b.card_id)
}
function removeB(b) {
  menuStore.removeBottle(menu.value.id, b.card_id)
}
function addB(c) {
  menuStore.addBottle(menu.value.id, c)
  showAdd.value = false
}
function saveAndExit() {
  persist()
  showToast('已保存')
  router.push('/menu')
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.lbl {
  display: block;
  color: var(--oak);
  margin: 14px 0 6px;
  font-size: 15px;
}
.inp {
  width: 100%;
  padding: 11px;
  border: 1px dashed var(--dryflower);
  background: #fbf6e7;
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  outline: none;
  border-radius: 3px;
}
.logo-box {
  padding: 14px;
}
.logo-current {
  display: flex;
  gap: 12px;
  align-items: center;
}
.logo-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: 1px solid var(--dryflower);
}
.logo-img.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background: #f1e7cc;
}
.style-pick {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}
.style-btn {
  flex: 1;
  background: none;
  border: 1px solid var(--slate);
  border-radius: 4px;
  padding: 7px 4px;
  font-size: 13px;
  color: var(--slate);
  cursor: pointer;
}
.style-btn.on {
  border-color: var(--amber);
  color: var(--amber);
}
.btn-amber {
  width: 100%;
  padding: 11px;
}
.candidates {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
.cand {
  width: 33%;
  border: 1px solid var(--dryflower);
  cursor: pointer;
}
.cand:active {
  box-shadow: 0 0 10px var(--amber);
}
.bottles {
  display: grid;
  gap: 10px;
}
.bottle {
  padding: 12px;
}
.bottle.off {
  opacity: 0.5;
}
.b-name {
  font-size: 18px;
  color: var(--oak);
}
.b-price {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0;
  color: var(--slate);
}
.price-inp {
  width: 70px;
  padding: 4px 8px;
  border: 1px dashed var(--dryflower);
  background: #fff;
  color: var(--amber);
  font-family: 'Cormorant Garamond', serif;
  border-radius: 3px;
}
.b-ops {
  display: flex;
  gap: 8px;
}
.b-ops button {
  flex: 1;
  background: none;
  border: 1px solid var(--oak);
  border-radius: 4px;
  padding: 6px;
  color: var(--oak);
  cursor: pointer;
}
.add,
.save {
  width: 100%;
  padding: 13px;
  margin-top: 14px;
}
.empty {
  text-align: center;
  padding: 18px;
  color: var(--slate);
  font-style: italic;
}
.sheet-mask {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 85;
}
.sheet {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 18px;
  border-radius: 12px 12px 0 0;
  max-height: 70vh;
  overflow-y: auto;
}
.sheet-title {
  font-size: 20px;
  color: var(--oak);
  margin-bottom: 10px;
}
.add-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px dashed var(--dryflower);
}
.add-thumb {
  width: 40px;
  height: 53px;
  object-fit: cover;
}
</style>
