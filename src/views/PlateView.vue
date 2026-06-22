<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import { plants, plantsFor } from '../data/menu'
import BotanicalPlate from '../components/BotanicalPlate.vue'

const route = useRoute()
const router = useRouter()
const whisky = computed(() => store.get(route.params.id))
if (!whisky.value) router.replace('/menu')

const allFlavors = computed(() => {
  const f = whisky.value.flavor
  return [...f.nose, ...f.palate, ...f.finish]
})
// 风味轮：把风味词排成放射花瓣
const wheel = computed(() =>
  allFlavors.value.map((f, i) => {
    const n = allFlavors.value.length
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2
    return { f, x: 50 + Math.cos(ang) * 34, y: 50 + Math.sin(ang) * 34, ang: (i / n) * 360 }
  })
)
const usedPlants = computed(() => plantsFor(whisky.value.region, whisky.value.plants).map((k) => plants[k]))
</script>

<template>
  <div class="page plate-view" v-if="whisky">
    <button class="close font-fell" @click="router.back()">← 合上图鉴</button>

    <div class="big bloom">
      <BotanicalPlate :whisky="whisky" />
    </div>

    <!-- 品鉴笔记 -->
    <section class="notes bloom">
      <h3 class="sec-title font-fell">TASTING NOTES · 品鉴笔记</h3>
      <p class="note-text font-body">"{{ whisky.note }}"</p>
      <div class="note-grid">
        <div><span class="nk font-fell">NOSE 香气</span><p>{{ whisky.flavor.nose.join(' · ') }}</p></div>
        <div><span class="nk font-fell">PALATE 口感</span><p>{{ whisky.flavor.palate.join(' · ') }}</p></div>
        <div><span class="nk font-fell">FINISH 余韵</span><p>{{ whisky.flavor.finish.join(' · ') }}</p></div>
      </div>
    </section>

    <!-- 风味轮 -->
    <section class="wheel-sec bloom">
      <h3 class="sec-title font-fell">FLAVOUR WHEEL · 风味轮</h3>
      <div class="wheel">
        <svg viewBox="0 0 100 100" class="wheel-svg">
          <circle cx="50" cy="50" r="36" fill="none" stroke="var(--dried)" stroke-width="0.4" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="var(--dried)" stroke-width="0.4" />
          <line v-for="(p, i) in wheel" :key="i" x1="50" y1="50" :x2="p.x" :y2="p.y" stroke="var(--moss)" stroke-width="0.3" opacity="0.5" />
          <circle v-for="(p, i) in wheel" :key="'d' + i" :cx="p.x" :cy="p.y" r="2.6" fill="var(--moss)" opacity="0.7" />
        </svg>
        <span
          v-for="(p, i) in wheel"
          :key="'l' + i"
          class="wheel-label font-body"
          :style="{ left: p.x + '%', top: p.y + '%' }"
        >{{ p.f }}</span>
      </div>
    </section>

    <!-- 植物标注 -->
    <section class="botanical bloom">
      <h3 class="sec-title font-fell">BOTANICAL · 植物标注</h3>
      <div v-for="p in usedPlants" :key="p.latin" class="bot-row specimen">
        <span class="bot-latin font-latin">{{ p.latin }}</span>
        <span class="bot-cn font-body">{{ p.cn }}</span>
      </div>
    </section>

    <p class="pv-foot font-latin">— {{ whisky.cn }} · ¥{{ whisky.cup }}/杯 —</p>
  </div>
</template>

<style scoped>
.close {
  background: none; border: none; color: var(--oak);
  font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 14px;
}
.big { max-width: 320px; margin: 0 auto 24px; }

.sec-title {
  font-size: 13px; letter-spacing: 0.16em; color: var(--slate);
  text-align: center; margin: 0 0 12px;
}
.notes { margin-bottom: 24px; }
.note-text {
  font-size: 16px; font-style: italic; color: var(--oak);
  text-align: center; line-height: 1.6; margin: 0 0 16px;
}
.note-grid { display: flex; flex-direction: column; gap: 10px; }
.note-grid > div {
  border-left: 2px solid var(--moss); padding-left: 12px;
}
.nk { font-size: 11px; letter-spacing: 0.1em; color: var(--moss); }
.note-grid p { margin: 2px 0 0; font-size: 15px; color: var(--ink); }

.wheel-sec { margin-bottom: 24px; }
.wheel {
  position: relative; width: 260px; height: 260px; margin: 0 auto;
}
.wheel-svg { width: 100%; height: 100%; }
.wheel-label {
  position: absolute; transform: translate(-50%, -50%);
  font-size: 12px; color: var(--oak); background: rgba(245,237,214,0.85);
  padding: 1px 5px; border-radius: 2px; white-space: nowrap;
}

.botanical { margin-bottom: 20px; }
.bot-row {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
}
.bot-latin { font-size: 17px; color: var(--moss); }
.bot-cn { font-size: 14px; color: var(--ink); }

.pv-foot { text-align: center; color: var(--dried); font-size: 16px; }
</style>
