<script setup>
// 植物图鉴牌 — 一瓶威士忌 = 一幅标本级铜版画
import { computed } from 'vue'
import { plants, templates, plantsFor } from '../data/menu'
import PlantArt from './PlantArt.vue'

const props = defineProps({
  whisky: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

const tpl = computed(() => templates.find((t) => t.id === props.whisky.template) || templates[0])
const usedPlants = computed(() => plantsFor(props.whisky.region, props.whisky.plants).map((k) => plants[k]))
const primary = computed(() => usedPlants.value[0])
</script>

<template>
  <article
    class="plate plate-frame"
    :style="{ '--accent': tpl.accent, background: tpl.paper }"
    :class="{ compact }"
  >
    <!-- 角标装饰 -->
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>

    <header class="p-head">
      <span class="p-order font-fell">No. {{ whisky.id.slice(-3).toUpperCase() }}</span>
      <span class="p-region smallcaps font-fell">{{ whisky.region }}</span>
    </header>

    <!-- 植物插画 -->
    <div class="art grow">
      <PlantArt :kind="primary.kind" :color="tpl.accent" :size="compact ? 92 : 130" />
      <div class="wax-seal seal" v-if="!compact">
        <span>{{ whisky.region.slice(0, 3) }}<br />SEAL</span>
      </div>
    </div>

    <!-- 拉丁学名 -->
    <p class="latin font-latin">{{ primary.latin }}</p>
    <p class="latin-cn font-fell">{{ primary.cn }} · {{ whisky.cask }}</p>

    <hr class="rule double" />

    <!-- 酒名 -->
    <h2 class="p-name font-title">{{ whisky.name }}</h2>
    <p class="p-cn font-body">{{ whisky.cn }}</p>

    <!-- 标本标签 -->
    <div class="specimen p-spec" v-if="!compact">
      <div class="spec-row"><span>DISTILLED</span><span>{{ whisky.age }} YEARS</span></div>
      <div class="spec-row"><span>STRENGTH</span><span>{{ whisky.abv }}% VOL</span></div>
      <div class="spec-row"><span>BOTANICAL</span><span>{{ usedPlants.map((p) => p.cn).join(' · ') }}</span></div>
    </div>

    <footer class="p-foot">
      <span class="price">¥{{ whisky.cup }}<small>/杯</small></span>
      <span class="p-mark font-fell">HERBARIUM</span>
    </footer>
  </article>
</template>

<style scoped>
.plate {
  padding: 18px 16px 14px;
  position: relative;
  overflow: hidden;
}
.plate.compact {
  padding: 12px;
}
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 1px solid var(--accent);
  opacity: 0.6;
}
.tl { top: 7px; left: 7px; border-right: none; border-bottom: none; }
.tr { top: 7px; right: 7px; border-left: none; border-bottom: none; }
.bl { bottom: 7px; left: 7px; border-right: none; border-top: none; }
.br { bottom: 7px; right: 7px; border-left: none; border-top: none; }

.p-head {
  display: flex;
  justify-content: space-between;
  color: var(--oak);
  font-size: 11px;
  letter-spacing: 0.1em;
}
.art {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 6px 0;
}
.seal {
  position: absolute;
  right: 2px;
  bottom: 4px;
  transform: rotate(-8deg);
}
.latin {
  text-align: center;
  color: var(--oak);
  font-size: 18px;
  margin: 2px 0 0;
}
.compact .latin { font-size: 15px; }
.latin-cn {
  text-align: center;
  color: var(--slate);
  font-size: 12px;
  letter-spacing: 0.06em;
  margin: 2px 0;
}
.p-name {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: var(--ink);
  margin: 4px 0 0;
  letter-spacing: 0.02em;
}
.compact .p-name { font-size: 19px; }
.p-cn {
  text-align: center;
  color: var(--oak);
  font-size: 13px;
  margin: 1px 0 8px;
}
.p-spec {
  margin: 8px 0;
  font-size: 11px;
}
.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  letter-spacing: 0.05em;
  color: var(--ink);
}
.spec-row span:first-child {
  color: var(--slate);
  font-size: 10px;
}
.p-foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 6px;
}
.price { font-size: 20px; }
.price small { font-size: 11px; color: var(--slate); }
.p-mark {
  font-size: 11px;
  letter-spacing: 0.25em;
  color: var(--dried);
}
</style>
