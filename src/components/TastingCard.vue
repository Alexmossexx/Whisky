<script setup>
// AI 生成品鉴卡的「炼金产物」— 纯 CSS/DOM 渲染，离线可用
// （生产环境由 豆包 Seedream 5.0 出图，此处为程序化保底视觉）
import { computed } from 'vue'
import { templates } from '../data/whiskies'

const props = defineProps({
  whisky: { type: Object, required: true },
  templateId: { type: String, default: 'acid-chrome' },
  notes: { type: String, default: '' }
})

const tpl = computed(() => templates.find((t) => t.id === props.templateId) || templates[0])
const allFlavors = computed(() => [
  ...props.whisky.flavor.nose,
  ...props.whisky.flavor.palate,
  ...props.whisky.flavor.finish
])
</script>

<template>
  <div class="tcard brushed" :style="{ background: tpl.bg, '--ac': tpl.accent }">
    <div class="grain"></div>
    <div class="scan"></div>

    <header class="t-head">
      <span class="t-tpl label-mono" :style="{ color: tpl.accent }">{{ tpl.name }}</span>
      <span class="t-score font-mono">{{ whisky.score }}<small>/100</small></span>
    </header>

    <div class="t-body">
      <div class="t-glass" :style="{ '--ac': whisky.accent }">
        <div class="liquid"></div>
      </div>
      <h2 class="t-name font-display">{{ whisky.name }}</h2>
      <p class="t-cn">{{ whisky.cn }}</p>

      <div class="t-meta font-mono">
        <span>{{ whisky.distillery }}</span>
        <span>·</span>
        <span>{{ whisky.region }}</span>
        <span>·</span>
        <span>{{ whisky.age }}</span>
        <span>·</span>
        <span>{{ whisky.abv }}</span>
      </div>
    </div>

    <div class="t-flavors">
      <span
        v-for="(f, i) in allFlavors"
        :key="f + i"
        class="t-fl"
        :style="{ animationDelay: i * 0.05 + 's' }"
        >{{ f }}</span
      >
    </div>

    <footer class="t-foot">
      <p class="t-note">“{{ notes || whisky.note }}”</p>
      <span class="t-brand brand-title">WHISKY ALCHEMY</span>
    </footer>
  </div>
</template>

<style scoped>
.tcard {
  aspect-ratio: 3 / 4;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  position: relative;
  overflow: hidden;
  padding: 22px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--glow-gold);
}
.grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
}
.scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.025) 0px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
}
.t-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  z-index: 2;
}
.t-tpl {
  font-size: 10px;
}
.t-score {
  color: var(--ac);
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0 0 12px currentColor;
}
.t-score small {
  font-size: 10px;
  opacity: 0.5;
}
.t-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
}
.t-glass {
  width: 56px;
  height: 64px;
  margin-bottom: 14px;
  border: 2px solid var(--ac);
  border-top: none;
  border-radius: 0 0 28px 28px;
  position: relative;
  box-shadow: 0 0 18px var(--ac);
  overflow: hidden;
}
.liquid {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(180deg, rgba(201, 168, 76, 0.4), var(--ac));
  filter: blur(1px);
  animation: slosh 3s ease-in-out infinite;
}
@keyframes slosh {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-3px) rotate(1deg);
  }
}
.t-name {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #f5d78e, #c9a84c, #8b6914);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}
.t-cn {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin: 6px 0 12px;
  letter-spacing: 0.2em;
}
.t-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
}
.t-flavors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  z-index: 2;
  margin: 14px 0;
}
.t-fl {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 2px;
  border: 1px solid var(--ac);
  color: var(--ac);
  background: rgba(0, 0, 0, 0.3);
  text-shadow: 0 0 6px currentColor;
  animation: rise 0.5s both;
}
.t-foot {
  z-index: 2;
  text-align: center;
}
.t-note {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 10px;
}
.t-brand {
  font-size: 11px !important;
  letter-spacing: 0.3em;
}
</style>
