<script setup>
// 铜版画风格植物 SVG 插画 — 按 kind 选择
// 细线条 + 苔藓绿描边 + 柔和水彩填充
defineProps({
  kind: { type: String, default: 'barley' },
  color: { type: String, default: '#4A6B3A' },
  size: { type: Number, default: 120 }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 120 120"
    fill="none"
    :style="{ '--c': color }"
    class="plant"
  >
    <!-- 大麦 -->
    <g v-if="kind === 'barley'" stroke="var(--c)" stroke-width="1.4" stroke-linecap="round">
      <path d="M60 112 V40" />
      <g v-for="(y, i) in [44, 54, 64, 74, 84]" :key="i">
        <path :d="`M60 ${y} q-14 -6 -20 -16`" />
        <path :d="`M60 ${y} q14 -6 20 -16`" />
        <ellipse :cx="40" :cy="y - 18" rx="3" ry="7" fill="rgba(196,148,74,0.25)" transform="rotate(-30 40 60)" />
        <ellipse :cx="80" :cy="y - 18" rx="3" ry="7" fill="rgba(196,148,74,0.25)" transform="rotate(30 80 60)" />
      </g>
      <path d="M60 40 l-2 -22 M60 40 l2 -22 M60 24 l-2 -14 M60 24 l2 -14" />
    </g>

    <!-- 橡木（叶 + 橡果） -->
    <g v-else-if="kind === 'oak'" stroke="var(--c)" stroke-width="1.4" stroke-linejoin="round">
      <path
        d="M60 18 C46 26 50 36 40 40 C52 42 46 52 38 56 C52 56 48 66 42 72 C56 70 54 80 50 88 C60 82 60 92 60 100 C60 92 60 82 70 88 C66 80 64 70 78 72 C72 66 68 56 82 56 C74 52 68 42 80 40 C70 36 74 26 60 18 Z"
        fill="rgba(74,107,58,0.12)"
      />
      <path d="M60 24 V96" stroke-width="1" />
      <g fill="rgba(196,148,74,0.3)">
        <ellipse cx="44" cy="104" rx="6" ry="9" />
        <ellipse cx="74" cy="106" rx="5" ry="8" />
      </g>
      <path d="M44 96 a6 4 0 0 0 0 4 M74 99 a5 3 0 0 0 0 3" />
    </g>

    <!-- 石楠花 / 欧石南 -->
    <g v-else-if="kind === 'heather'" stroke="var(--c)" stroke-width="1.3" stroke-linecap="round">
      <path d="M60 112 V44 M60 90 q-16 -4 -22 -16 M60 78 q16 -4 22 -16 M60 66 q-14 -4 -20 -14" />
      <g :fill="`rgba(184,147,122,0.4)`" stroke="var(--c)" stroke-width="0.8">
        <circle v-for="(p, i) in [[60,40],[52,34],[68,34],[46,40],[74,40],[60,28],[54,22],[66,22]]" :key="i" :cx="p[0]" :cy="p[1]" r="3.4" />
      </g>
    </g>

    <!-- 泥煤苔 -->
    <g v-else-if="kind === 'moss'" stroke="var(--c)" stroke-width="1.2" stroke-linecap="round">
      <g v-for="(x, i) in [34, 48, 62, 76, 90]" :key="i">
        <path :d="`M${x} 110 V${56 + (i % 2) * 8}`" />
        <path :d="`M${x} ${64 + (i % 2) * 8} q-7 -4 -10 -12 M${x} ${64 + (i % 2) * 8} q7 -4 10 -12`" />
        <circle :cx="x" :cy="52 + (i % 2) * 8" r="5" fill="rgba(74,107,58,0.18)" />
      </g>
    </g>

    <!-- 海藻 -->
    <g v-else-if="kind === 'seaweed'" stroke="var(--c)" stroke-width="1.4" stroke-linecap="round">
      <path d="M50 112 C42 90 58 84 48 60 C42 44 56 36 50 18" fill="none" />
      <path d="M70 112 C78 88 62 80 72 56 C78 42 64 34 70 20" fill="none" />
      <g fill="rgba(74,107,58,0.2)">
        <ellipse cx="48" cy="60" rx="5" ry="3" /><ellipse cx="72" cy="56" rx="5" ry="3" />
        <ellipse cx="50" cy="36" rx="4" ry="2.6" /><ellipse cx="70" cy="38" rx="4" ry="2.6" />
      </g>
    </g>

    <!-- 松 -->
    <g v-else-if="kind === 'pine'" stroke="var(--c)" stroke-width="1.3" stroke-linecap="round">
      <path d="M60 112 V30" />
      <g v-for="(y, i) in [40, 54, 68, 82]" :key="i">
        <g v-for="n in 7" :key="n">
          <path :d="`M60 ${y} l${-4 - n * 3} ${-10}`" />
          <path :d="`M60 ${y} l${4 + n * 3} ${-10}`" />
        </g>
      </g>
      <ellipse cx="46" cy="92" rx="5" ry="9" fill="rgba(92,61,46,0.25)" transform="rotate(-20 46 92)" />
    </g>

    <!-- 苹果 -->
    <g v-else-if="kind === 'apple'" stroke="var(--c)" stroke-width="1.4" stroke-linejoin="round">
      <circle cx="60" cy="70" r="30" fill="rgba(196,148,74,0.18)" />
      <path d="M60 40 C58 30 64 24 72 22" fill="none" />
      <path d="M62 38 C72 30 82 34 84 42 C76 46 66 44 62 38 Z" fill="rgba(74,107,58,0.2)" />
      <path d="M60 40 V70" stroke-width="0.8" opacity="0.5" />
    </g>

    <!-- 樱花 -->
    <g v-else-if="kind === 'sakura'" stroke="var(--c)" stroke-width="1.2" stroke-linecap="round">
      <path d="M30 112 C40 86 50 78 60 60 M60 60 C70 50 84 50 96 42" fill="none" stroke-width="1.6" />
      <g v-for="(p, i) in [[60,60],[78,50],[44,78],[92,42]]" :key="i">
        <g :transform="`translate(${p[0]} ${p[1]})`">
          <g v-for="n in 5" :key="n" :transform="`rotate(${n * 72})`">
            <path d="M0 0 C-4 -6 -2 -12 0 -14 C2 -12 4 -6 0 0 Z" fill="rgba(184,147,122,0.45)" />
          </g>
          <circle r="1.6" fill="var(--c)" />
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.plant {
  display: block;
}
</style>
