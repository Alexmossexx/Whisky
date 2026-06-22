<template>
  <div class="anim-wash">
    <AppHeader title="酒窖 · 植物标本柜" back />
    <div class="px">
      <div class="region-tabs scroll-x">
        <button
          v-for="r in regions"
          :key="r.key"
          class="rtab"
          :class="{ on: active === r.key }"
          @click="active = r.key"
        >
          <WaxSeal :color="r.seal" :text="r.label[0]" />
          <span>{{ r.label }}</span>
        </button>
      </div>

      <div class="region-info specimen-label">
        <div class="font-bottle ri-name">{{ current.label }} · {{ current.en }}</div>
        <div class="latin">{{ current.latin }}</div>
        <div class="ri-plant">🌿 {{ current.plant }}</div>
      </div>

      <div class="bottles">
        <div
          v-for="w in bottles"
          :key="w.id"
          class="bottle engrave-frame card-press anim-grow"
          @click="$router.push(`/confirm/${w.id}`)"
        >
          <div class="b-name font-bottle">{{ w.name_cn }}</div>
          <div class="latin">{{ w.latin }}</div>
          <div class="b-meta">{{ w.age ? w.age + '年' : 'NAS' }} · {{ w.abv }}% · {{ w.score }}分</div>
        </div>
        <div v-if="!bottles.length" class="empty specimen-label">本产区暂无标本</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { REGIONS, KNOWLEDGE_BASE, regionOf } from '../data/mock'
import AppHeader from '../components/AppHeader.vue'
import WaxSeal from '../components/WaxSeal.vue'

const regions = REGIONS
const active = ref('islay')
const current = computed(() => regionOf(active.value))
const bottles = computed(() => KNOWLEDGE_BASE.filter((w) => w.region === active.value))
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.region-tabs {
  display: flex;
  gap: 14px;
  padding: 8px 2px 14px;
}
.rtab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--slate);
  font-size: 13px;
  cursor: pointer;
  opacity: 0.6;
}
.rtab.on {
  opacity: 1;
  color: var(--oak);
}
.region-info {
  padding: 14px;
  text-align: center;
}
.ri-name {
  font-size: 22px;
  color: var(--oak);
}
.ri-plant {
  color: var(--moss);
  margin-top: 6px;
}
.bottles {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}
.bottle {
  background: #fbf6e7;
  padding: 14px;
}
.b-name {
  font-size: 20px;
  color: var(--oak);
}
.b-meta {
  margin-top: 6px;
  color: var(--amber);
  font-family: 'Cormorant Garamond', serif;
}
.empty {
  text-align: center;
  padding: 24px;
  color: var(--slate);
  font-style: italic;
}
</style>
