<template>
  <div class="anim-wash">
    <header class="home-hdr">
      <h1 class="font-brand brand">WHISKY<br />ATLAS</h1>
      <p class="latin slogan">每一瓶威士忌，都是土地写给人的一封植物信</p>
    </header>

    <div class="px">
      <div class="search engrave-frame" :class="{ focus }">
        <input
          v-model="kw"
          class="search-input"
          placeholder="输入酒款编号 / 关键字…"
          @focus="focus = true"
          @blur="focus = false"
          @keyup.enter="doSearch"
        />
        <button class="btn-amber search-btn" @click="doSearch">搜</button>
      </div>

      <div v-if="results.length" class="results specimen-label">
        <div
          v-for="w in results"
          :key="w.id"
          class="res-row card-press"
          @click="go(w)"
        >
          <span>{{ w.name_cn || w.whisky_name }}</span>
          <span class="latin">{{ regionOf(w.region).label }}</span>
        </div>
      </div>

      <div class="botanical-divider font-botanical">🌿 热门酒款</div>
      <div class="hot-grid">
        <div
          v-for="w in hot"
          :key="w.id"
          class="hot-card engrave-frame card-press anim-grow"
          @click="go(w)"
        >
          <div class="hot-plant">{{ regionOf(w.region).key === 'islay' ? '🌾' : '🌸' }}</div>
          <div class="hot-name font-bottle">{{ w.name_cn }}</div>
          <div class="specimen-label hot-price">{{ regionOf(w.region).label }}</div>
        </div>
      </div>

      <button class="enter-cellar font-botanical" @click="$router.push('/shelf')">
        <WaxSeal color="#c4944a" text="→" /> 进入酒窖
      </button>

      <div class="botanical-divider font-botanical">📖 最近生成</div>
      <div v-if="recent.length" class="recent">
        <div
          v-for="c in recent"
          :key="c.id"
          class="recent-card engrave-frame card-press"
          @click="$router.push(`/result/${c.id}`)"
        >
          <img :src="c.image_url" class="recent-img" />
          <div class="recent-name font-bottle">{{ c.name_cn || c.whisky_name }}</div>
        </div>
      </div>
      <div v-else class="empty specimen-label">空白标本标签 · 暂无记录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { searchWhisky } from '../services/api'
import { HOT_WHISKIES, KNOWLEDGE_BASE, regionOf } from '../data/mock'
import { useCardStore } from '../store'
import WaxSeal from '../components/WaxSeal.vue'

const router = useRouter()
const cardStore = useCardStore()
const kw = ref('')
const focus = ref(false)
const results = ref([])

const hot = computed(() => HOT_WHISKIES.map((id) => KNOWLEDGE_BASE.find((w) => w.id === id)))
const recent = computed(() => cardStore.cards.slice(0, 4))

async function doSearch() {
  results.value = await searchWhisky(kw.value)
}
function go(w) {
  router.push(`/confirm/${w.id}`)
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.home-hdr {
  text-align: center;
  padding: 30px 16px 10px;
}
.brand {
  font-size: 46px;
  line-height: 1.05;
  color: var(--oak);
  margin: 0;
}
.slogan {
  margin-top: 10px;
  font-size: 13px;
}
.search {
  display: flex;
  align-items: center;
  background: #fbf6e7;
  padding: 4px 4px 4px 14px;
  margin-top: 8px;
  transition: box-shadow 0.3s ease;
}
.search.focus {
  box-shadow: 0 0 14px rgba(196, 148, 74, 0.45), inset 0 0 0 3px var(--parchment),
    inset 0 0 0 4px rgba(92, 61, 46, 0.55);
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'EB Garamond', serif;
  font-size: 16px;
  outline: none;
  color: var(--ink);
}
.search-btn {
  padding: 8px 16px;
}
.results {
  margin-top: 10px;
  padding: 6px 12px;
}
.res-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed var(--dryflower);
}
.res-row:last-child {
  border-bottom: none;
}
.hot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.hot-card {
  background: #fbf6e7;
  padding: 14px;
  text-align: center;
}
.hot-plant {
  font-size: 26px;
}
.hot-name {
  font-size: 18px;
  color: var(--oak);
  margin: 6px 0;
}
.hot-price {
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  color: var(--moss);
}
.enter-cellar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 18px auto;
  background: none;
  border: none;
  font-size: 18px;
  color: var(--oak);
  cursor: pointer;
}
.recent {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}
.recent-card {
  background: #fbf6e7;
  padding: 6px;
  min-width: 130px;
}
.recent-img {
  width: 118px;
  height: 158px;
  object-fit: cover;
}
.recent-name {
  font-size: 15px;
  text-align: center;
  color: var(--oak);
  margin-top: 4px;
}
.empty {
  text-align: center;
  padding: 24px;
  color: var(--slate);
  font-style: italic;
}
</style>
