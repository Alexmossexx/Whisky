<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { bar, plants, plantsFor } from '../data/menu'
import PlantArt from '../components/PlantArt.vue'

const router = useRouter()
const items = computed(() => store.available)

// 按产区分组 (PRD：按产区/植物分组)
const grouped = computed(() => {
  const g = {}
  for (const w of items.value) (g[w.region] ||= []).push(w)
  return g
})

function primaryPlant(w) {
  return plants[plantsFor(w.region, w.plants)[0]]
}
</script>

<template>
  <div class="page menu">
    <button class="link-back font-fell" @click="router.push('/')">← 退出预览</button>

    <header class="m-head bloom">
      <span class="m-eyebrow font-fell">SCAN TO BROWSE · 客人视图</span>
      <h1 class="m-bar font-title">{{ bar.name }}</h1>
      <p class="m-cn font-body">{{ bar.cn }}</p>
      <hr class="rule-fancy">❦ WHISKY · HERBARIUM ❦</hr>
    </header>

    <section v-for="(group, region) in grouped" :key="region" class="group">
      <h2 class="g-title font-fell">
        <span class="g-line"></span>{{ region }}<span class="g-line"></span>
      </h2>

      <button
        v-for="(w, i) in group"
        :key="w.id"
        class="m-row card bloom"
        :style="{ animationDelay: i * 0.06 + 's' }"
        @click="router.push(`/plate/${w.id}`)"
      >
        <div class="m-art">
          <PlantArt :kind="primaryPlant(w).kind" color="#4A6B3A" :size="60" />
        </div>
        <div class="m-info">
          <span class="m-name font-title">{{ w.name }}</span>
          <span class="m-latin font-latin">{{ primaryPlant(w).latin }}</span>
          <span class="m-meta font-body">{{ w.cn }} · {{ w.cask }} · {{ w.age }}yr</span>
          <div class="m-flav">
            <span v-for="f in w.flavor.nose" :key="f" class="chip">{{ f }}</span>
          </div>
        </div>
        <div class="m-price">
          <span class="price">¥{{ w.cup }}</span>
          <span class="m-unit font-fell">/ 杯</span>
        </div>
      </button>
    </section>

    <p class="m-foot font-latin">— Vinum · Herba · Terra —</p>
  </div>
</template>

<style scoped>
.link-back {
  background: none; border: none; color: var(--oak);
  font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 12px;
}
.m-head { text-align: center; margin-bottom: 10px; }
.m-eyebrow { font-size: 11px; letter-spacing: 0.2em; color: var(--slate); }
.m-bar { font-size: 32px; font-weight: 600; color: var(--oak); margin: 4px 0 0; }
.m-cn { font-size: 14px; color: var(--ink); margin: 2px 0 0; }

.group { margin-bottom: 18px; }
.g-title {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  font-size: 14px; letter-spacing: 0.2em; color: var(--moss);
  text-transform: uppercase; margin: 18px 0 12px;
}
.g-line { flex: 1; height: 1px; background: var(--dried); opacity: 0.6; }

.m-row {
  width: 100%; display: flex; gap: 12px; padding: 12px;
  align-items: center; cursor: pointer; text-align: left;
  margin-bottom: 10px; transition: transform 0.2s, box-shadow 0.2s;
}
.m-row:active { transform: translateY(2px); box-shadow: 0 4px 14px rgba(92,61,46,0.12); }
.m-art {
  width: 64px; flex-shrink: 0; display: flex; align-items: center;
  justify-content: center; border-right: 1px dashed var(--dried);
}
.m-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.m-name { font-size: 18px; font-weight: 600; color: var(--ink); }
.m-latin { font-size: 13px; color: var(--moss); }
.m-meta { font-size: 12px; color: var(--slate); }
.m-flav { margin-top: 4px; }
.m-flav .chip { font-size: 11px; padding: 1px 7px; margin: 2px 4px 0 0; }
.m-price {
  flex-shrink: 0; display: flex; flex-direction: column;
  align-items: flex-end; text-align: right;
}
.m-price .price { font-size: 22px; }
.m-unit { font-size: 11px; color: var(--slate); }

.m-foot {
  text-align: center; color: var(--dried); font-size: 16px; margin-top: 20px;
}
</style>
