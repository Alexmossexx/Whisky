<template>
  <div class="anim-wash" v-if="w">
    <AppHeader title="确认数据" back />
    <div class="px">
      <div class="panel specimen-label">
        <div class="p-title font-bottle">{{ w.name_cn }}</div>
        <div class="latin">{{ w.latin }}</div>
        <div class="rows">
          <div class="row"><span class="k">蒸馏所</span><span class="v">{{ w.distillery }}</span></div>
          <div class="row"><span class="k">产区</span><span class="v">{{ region.label }} {{ w.country }}</span></div>
          <div class="row"><span class="k">酒龄</span><span class="v num">{{ w.age ? w.age + '年' : '—' }}</span></div>
          <div class="row"><span class="k">ABV</span><span class="v num">{{ w.abv }}%</span></div>
          <div class="row"><span class="k">桶型</span><span class="v">{{ w.cask_type || '—' }}</span></div>
          <div class="row"><span class="k">装瓶商</span><span class="v">{{ w.bottler || '—' }}</span></div>
          <div class="row"><span class="k">WB评分</span><span class="v num">{{ w.score || '暂无评分' }}</span></div>
        </div>
      </div>

      <div class="flavor-head">
        风味摘要
        <span class="conf" :class="w.confidence">{{ confLabel }}</span>
      </div>
      <div class="flavors specimen-label">
        <div class="fl-line">🌹 香气</div>
        <div><span v-for="f in w.flavors.nose" :key="f" class="flavor-tag">{{ f }}</span></div>
        <div class="fl-line">👅 口感</div>
        <div><span v-for="f in w.flavors.palate" :key="f" class="flavor-tag">{{ f }}</span></div>
        <div class="fl-line">✨ 余韵</div>
        <div><span v-for="f in w.flavors.finish" :key="f" class="flavor-tag">{{ f }}</span></div>
      </div>

      <button class="btn-amber next" @click="$router.push(`/path/${w.id}`)">→ 选择生成路径</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getWhisky } from '../services/api'
import { regionOf as regionFn } from '../data/mock'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const w = ref(null)
onMounted(async () => {
  w.value = await getWhisky(route.params.id)
})
const region = computed(() => (w.value ? regionFn(w.value.region) : {}))
const confLabel = computed(() => {
  const m = { high: 'high ✓', medium: 'medium 参考', low: 'low 推测' }
  return w.value ? m[w.value.confidence] : ''
})
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.panel {
  padding: 16px;
}
.p-title {
  font-size: 24px;
  color: var(--oak);
}
.rows {
  margin-top: 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px dashed rgba(184, 147, 122, 0.5);
}
.k {
  color: var(--slate);
}
.v {
  color: var(--oak);
}
.v.num {
  color: var(--amber);
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
}
.flavor-head {
  margin: 18px 0 8px;
  font-size: 17px;
  color: var(--oak);
  display: flex;
  align-items: center;
  gap: 8px;
}
.conf {
  font-size: 12px;
  padding: 1px 8px;
  border-radius: 3px;
}
.conf.high {
  background: rgba(74, 107, 58, 0.15);
  color: var(--moss);
}
.conf.medium {
  background: rgba(196, 148, 74, 0.18);
  color: #a9803c;
}
.conf.low {
  background: rgba(123, 139, 111, 0.18);
  color: var(--slate);
}
.flavors {
  padding: 14px;
}
.fl-line {
  color: var(--oak);
  margin: 8px 0 2px;
}
.next {
  width: 100%;
  padding: 14px;
  margin: 22px 0;
  font-size: 17px;
}
</style>
