<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findWhisky } from '../data/whiskies'
import BackBar from '../components/BackBar.vue'

const route = useRoute()
const router = useRouter()
const w = computed(() => findWhisky(route.params.id))

const meta = computed(() => [
  ['DISTILLERY', w.value.distillery],
  ['REGION', w.value.region],
  ['AGE', w.value.age],
  ['ABV', w.value.abv],
  ['CASK', w.value.cask]
])

const confPct = computed(() => Math.round(w.value.confidence * 100))
const confClass = computed(() =>
  w.value.level === 'high' ? '' : w.value.level === 'medium' ? 'med' : 'low'
)
const confTag = computed(() =>
  w.value.level === 'high' ? '' : w.value.level === 'medium' ? 'REF' : 'EST.'
)

function next() {
  router.push(`/template/${w.value.id}`)
}
</script>

<template>
  <div class="page">
    <BackBar title="CONFIRM DATA" />

    <!-- 数据面板 -->
    <section class="panel brushed data-panel rise">
      <span class="p-label label-mono">NAME</span>
      <h1 class="p-name font-display">{{ w.name }}</h1>
      <p class="p-cn">{{ w.cn }}</p>

      <div class="meta-grid">
        <div v-for="[k, v] in meta" :key="k" class="meta-row">
          <span class="label-mono">{{ k }}</span>
          <span class="meta-val font-mono">{{ v }}</span>
        </div>
      </div>
    </section>

    <!-- 风味频谱 -->
    <div class="acid-divider rise" style="animation-delay: 0.1s">FLAVOR SPECTRUM</div>
    <section class="panel brushed spectrum rise" style="animation-delay: 0.16s">
      <div class="spec-block">
        <span class="spec-key label-mono">NOSE</span>
        <div>
          <span v-for="f in w.flavor.nose" :key="f" class="flavor-tag">{{ f }}</span>
        </div>
      </div>
      <div class="spec-block">
        <span class="spec-key label-mono">PALATE</span>
        <div>
          <span v-for="f in w.flavor.palate" :key="f" class="flavor-tag corrode">{{ f }}</span>
        </div>
      </div>
      <div class="spec-block">
        <span class="spec-key label-mono">FINISH</span>
        <div>
          <span v-for="f in w.flavor.finish" :key="f" class="flavor-tag">{{ f }}</span>
        </div>
      </div>

      <div class="conf">
        <div class="conf-head">
          <span class="label-mono">CONFIDENCE</span>
          <span class="conf-pct font-mono"
            >{{ confPct }}% <em v-if="confTag">{{ confTag }}</em></span
          >
        </div>
        <div class="confidence-bar">
          <div class="confidence-fill" :class="confClass" :style="{ width: confPct + '%' }"></div>
        </div>
      </div>
    </section>

    <button class="btn-chrome cta rise" style="animation-delay: 0.24s" @click="next">
      ► SELECT TEMPLATE
    </button>
  </div>
</template>

<style scoped>
.data-panel {
  padding: 20px;
  margin-bottom: 26px;
}
.p-label {
  display: block;
  margin-bottom: 6px;
}
.p-name {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}
.p-cn {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.15em;
  margin: 6px 0 18px;
}
.meta-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  padding-top: 16px;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-val {
  color: #fff;
  font-size: 13px;
}
.meta-row:nth-child(n + 3) .meta-val {
  background: linear-gradient(135deg, #f5d78e, #c9a84c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.spectrum {
  padding: 20px;
  margin-bottom: 26px;
}
.spec-block {
  margin-bottom: 16px;
}
.spec-key {
  display: block;
  margin-bottom: 8px;
  color: #6a6a6a;
}
.conf {
  margin-top: 8px;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  padding-top: 16px;
}
.conf-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.conf-pct {
  color: #00ffd1;
  font-size: 12px;
}
.conf-pct em {
  font-style: normal;
  color: #8b5cf6;
  margin-left: 4px;
}
.cta {
  width: 100%;
  font-size: 14px;
}
</style>
