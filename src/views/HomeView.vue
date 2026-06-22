<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { whiskies } from '../data/whiskies'
import { store } from '../store'

const router = useRouter()
const query = ref('')
const focused = ref(false)

const hot = whiskies.slice(0, 4)
const recent = computed(() => store.collection.slice(0, 2))

function search() {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    router.push('/cabinet')
    return
  }
  const hit = whiskies.find(
    (w) => w.name.toLowerCase().includes(q) || w.cn.includes(q) || w.id.includes(q)
  )
  router.push(hit ? `/confirm/${hit.id}` : '/cabinet')
}

function openWhisky(id) {
  router.push(`/confirm/${id}`)
}
</script>

<template>
  <div class="page">
    <!-- 品牌标题 -->
    <header class="hero rise">
      <h1 class="brand-title hero-title">WHISKY</h1>
      <h1 class="brand-title hero-title">ALCHEMY</h1>
      <p class="hero-sub label-mono">威士忌炼金术 · TASTING ATLAS</p>
    </header>

    <!-- 搜索框 -->
    <div class="search-wrap rise" :class="{ focused }" style="animation-delay: 0.08s">
      <div class="search-inner shimmer">
        <input
          v-model="query"
          class="search-input"
          placeholder="输入酒款编号 / 关键字…"
          @focus="focused = true"
          @blur="focused = false"
          @keyup.enter="search"
        />
        <button class="search-btn" @click="search">⌕</button>
      </div>
    </div>

    <!-- 热门酒款 -->
    <div class="acid-divider rise" style="animation-delay: 0.14s">HOT DRAFF</div>
    <div class="hot-grid">
      <button
        v-for="(w, i) in hot"
        :key="w.id"
        class="hot-card panel brushed rise"
        :style="{ animationDelay: 0.18 + i * 0.06 + 's', '--ac': w.accent }"
        @click="openWhisky(w.id)"
      >
        <div class="hot-glow"></div>
        <span class="hot-score font-mono">{{ w.score }}</span>
        <span class="hot-name font-display">{{ w.name }}</span>
        <span class="hot-cn">{{ w.cn }}</span>
        <span class="hot-region label-mono">{{ w.region }} · {{ w.age }}</span>
      </button>
    </div>

    <!-- 进入酒窖 -->
    <button class="enter-vault rise" style="animation-delay: 0.4s" @click="router.push('/cabinet')">
      ENTER THE VAULT →
    </button>

    <!-- 最近生成 -->
    <div class="acid-divider rise" style="animation-delay: 0.46s">RECENT ALCHEMY</div>
    <div v-if="recent.length" class="recent">
      <button
        v-for="r in recent"
        :key="r.ts"
        class="recent-row panel brushed"
        @click="openWhisky(r.id)"
      >
        <div class="recent-chip" :style="{ background: r.accent }"></div>
        <div class="recent-info">
          <span class="recent-name font-display">{{ r.name }}</span>
          <span class="recent-flow label-mono">NOSE · PALATE · FINISH</span>
        </div>
        <span class="recent-score font-mono">{{ r.score }}</span>
      </button>
    </div>
    <div v-else class="void-state panel brushed">
      <div class="void-bottle"></div>
      <span class="void-text brand-title">VOID</span>
      <span class="label-mono">尚无炼金记录 · 开始你的第一次蒸馏</span>
    </div>
  </div>
</template>

<style scoped>
.hero {
  margin: 10px 0 28px;
}
.hero-title {
  font-size: 44px;
  line-height: 1;
  letter-spacing: 0.18em;
}
.hero-sub {
  margin-top: 12px;
  color: #6a6a6a;
  letter-spacing: 0.25em;
}

.search-wrap {
  margin-bottom: 30px;
}
.search-inner {
  display: flex;
  align-items: center;
  background: var(--dark-metal);
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 3px;
  padding: 4px 4px 4px 16px;
  transition: all 0.25s ease;
}
.search-wrap.focused .search-inner {
  border-color: #00ffd1;
  box-shadow: var(--glow-acid);
}
.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 12px 0;
}
.search-input::placeholder {
  color: #4a4a4a;
}
.search-btn {
  width: 44px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: linear-gradient(135deg, #f5d78e, #c9a84c, #8b6914);
  color: #0a0a0a;
  font-size: 20px;
  cursor: pointer;
}

.hot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0 28px;
}
.hot-card {
  --ac: #c9a84c;
  text-align: left;
  padding: 16px 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hot-card:active {
  transform: translateY(-4px) perspective(600px) rotateX(4deg);
  box-shadow: var(--shadow-3d);
}
.hot-glow {
  position: absolute;
  top: -30%;
  right: -30%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--ac), transparent 70%);
  opacity: 0.25;
  filter: blur(8px);
}
.hot-score {
  color: var(--ac);
  font-size: 13px;
  font-weight: 700;
  text-shadow: 0 0 8px currentColor;
}
.hot-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 1.15;
}
.hot-cn {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.1em;
}
.hot-region {
  margin-top: 6px;
}

.enter-vault {
  width: 100%;
  background: none;
  border: 1px solid rgba(201, 168, 76, 0.4);
  border-radius: 3px;
  padding: 16px;
  color: #c9a84c;
  font-family: 'Space Grotesk', sans-serif;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.15em;
  font-size: 15px;
  text-shadow: 0 0 12px rgba(201, 168, 76, 0.4);
  cursor: pointer;
  margin-bottom: 30px;
  transition: all 0.2s ease;
}
.enter-vault:active {
  border-color: #00ffd1;
  color: #00ffd1;
  box-shadow: var(--glow-acid);
}

.recent {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.recent-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
}
.recent-chip {
  width: 8px;
  height: 36px;
  border-radius: 2px;
  box-shadow: 0 0 10px currentColor;
}
.recent-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.recent-name {
  font-size: 14px;
  color: #fff;
}
.recent-flow {
  color: #00ffd1;
}
.recent-score {
  color: #c9a84c;
  font-weight: 700;
  font-size: 16px;
}

.void-state {
  margin-top: 16px;
  padding: 36px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
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
