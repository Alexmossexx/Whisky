<template>
  <div class="anim-wash public" v-if="menu">
    <!-- 酒单头部 -->
    <div class="head">
      <img v-if="menu.logo_url" :src="menu.logo_url" class="logo" />
      <div v-else class="logo placeholder">🌿</div>
      <div>
        <div class="m-name font-bottle">{{ menu.name }}</div>
        <div class="m-desc">{{ menu.description }}</div>
      </div>
    </div>

    <!-- 按产区分组 -->
    <div v-for="g in groups" :key="g.key" class="group">
      <div class="g-head">
        <WaxSeal :color="g.seal" :text="g.label[0]" />
        <span class="font-brand">{{ g.en }}</span>
      </div>
      <div
        v-for="b in g.bottles"
        :key="b.card_id"
        class="bottle engrave-frame card-press"
        @click="preview = b.card.image_url"
      >
        <img :src="b.card.image_url" class="thumb" />
        <div class="b-body">
          <div class="b-name font-bottle">{{ b.card.name_cn || b.card.whisky_name }}</div>
          <div class="latin">{{ b.card.latin }}</div>
          <div class="b-foot">
            <span class="price-tag">{{ b.cup_price ? '¥' + b.cup_price + '/杯' : '' }}</span>
            <span class="wb">{{ b.card.score }} WB</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!activeBottles.length" class="empty specimen-label">该酒单暂无在架酒款</div>
    <p class="footer font-brand">Powered by WHISKY ATLAS</p>

    <div v-if="preview" class="preview" @click="preview = null">
      <img :src="preview" class="preview-img" />
    </div>
  </div>
  <div v-else class="empty specimen-label">酒单不存在</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../store'
import { REGIONS, regionOf } from '../data/mock'
import WaxSeal from '../components/WaxSeal.vue'

const route = useRoute()
const menuStore = useMenuStore()
const menu = computed(() => menuStore.byId(route.params.id))
const preview = ref(null)

const activeBottles = computed(() =>
  (menu.value?.bottles || []).filter((b) => b.status !== 'off')
)
const groups = computed(() => {
  const map = {}
  activeBottles.value.forEach((b) => {
    ;(map[b.region] = map[b.region] || []).push(b)
  })
  return REGIONS.filter((r) => map[r.key]).map((r) => ({
    ...r,
    bottles: map[r.key]
  }))
})
</script>

<style scoped>
.public {
  padding: 16px;
}
.head {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-bottom: 8px;
}
.logo {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 1.5px solid var(--oak);
}
.logo.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  background: #f1e7cc;
}
.m-name {
  font-size: 26px;
  color: var(--oak);
}
.m-desc {
  color: var(--slate);
  margin-top: 4px;
}
.group {
  margin-bottom: 18px;
}
.g-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--moss);
  font-size: 18px;
  margin-bottom: 10px;
}
.bottle {
  display: flex;
  gap: 12px;
  background: #fbf6e7;
  padding: 8px;
  margin-bottom: 10px;
}
.thumb {
  width: 70px;
  height: 93px;
  object-fit: cover;
}
.b-body {
  flex: 1;
}
.b-name {
  font-size: 19px;
  color: var(--oak);
}
.b-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.wb {
  color: var(--moss);
  font-family: 'Cormorant Garamond', serif;
}
.footer {
  text-align: center;
  color: var(--slate);
  margin: 20px 0;
}
.empty {
  text-align: center;
  padding: 30px;
  color: var(--slate);
  font-style: italic;
}
.preview {
  position: fixed;
  inset: 0;
  background: rgba(28, 24, 19, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90;
}
.preview-img {
  max-width: 92%;
  max-height: 90%;
}
</style>
