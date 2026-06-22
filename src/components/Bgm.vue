<script setup>
import { ref, onUnmounted } from 'vue'

// Dark Ambient + Industrial Minimal — Web Audio API 程序化合成 (PRD §2.6)
// 低频 drone + 金属 FM bell + 极简 kick 脉冲
const playing = ref(false)
let ctx = null
let nodes = []
let kickTimer = null

function buildDrone() {
  // 低频 sine pad（两个微失谐振荡叠加）
  ;[55, 55.4, 82.4].forEach((f, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = i === 2 ? 'triangle' : 'sine'
    osc.frequency.value = f
    gain.gain.value = i === 2 ? 0.025 : 0.05
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    nodes.push(osc, gain)
  })

  // 金属质感 FM bell（缓慢起伏的滤波）
  const carrier = ctx.createOscillator()
  const mod = ctx.createOscillator()
  const modGain = ctx.createGain()
  const bellGain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  carrier.frequency.value = 220
  mod.frequency.value = 313
  modGain.gain.value = 120
  filter.type = 'bandpass'
  filter.frequency.value = 900
  filter.Q.value = 6
  bellGain.gain.value = 0.012
  mod.connect(modGain).connect(carrier.frequency)
  carrier.connect(filter).connect(bellGain).connect(ctx.destination)
  carrier.start()
  mod.start()

  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.08
  lfoGain.gain.value = 600
  lfo.connect(lfoGain).connect(filter.frequency)
  lfo.start()
  nodes.push(carrier, mod, modGain, bellGain, filter, lfo, lfoGain)
}

function kick() {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.frequency.setValueAtTime(110, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12)
  gain.gain.setValueAtTime(0.18, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
  osc.connect(gain).connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.3)
}

function toggle() {
  if (playing.value) {
    nodes.forEach((n) => n.stop && n.stop())
    clearInterval(kickTimer)
    ctx && ctx.close()
    ctx = null
    nodes = []
    playing.value = false
  } else {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    buildDrone()
    kickTimer = setInterval(kick, 1600) // 极简脉冲
    playing.value = true
  }
}

onUnmounted(() => {
  clearInterval(kickTimer)
  ctx && ctx.close()
})
</script>

<template>
  <button class="bgm" :class="{ on: playing }" @click="toggle" aria-label="BGM">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </button>
</template>

<style scoped>
.bgm {
  position: fixed;
  right: 18px;
  bottom: calc(96px + env(safe-area-inset-bottom));
  width: 42px;
  height: 42px;
  border-radius: 3px;
  background: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(201, 168, 76, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 12px 0;
  z-index: 60;
  cursor: pointer;
}
.bar {
  width: 3px;
  height: 6px;
  background: #4a4a4a;
  border-radius: 1px;
  transition: background 0.2s;
}
.bgm.on {
  border-color: rgba(0, 255, 209, 0.5);
  box-shadow: 0 0 14px rgba(0, 255, 209, 0.25);
}
.bgm.on .bar {
  background: #00ffd1;
  box-shadow: 0 0 6px rgba(0, 255, 209, 0.8);
  animation: eq 0.8s ease-in-out infinite;
}
.bgm.on .bar:nth-child(2) {
  animation-delay: 0.2s;
}
.bgm.on .bar:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes eq {
  0%,
  100% {
    height: 6px;
  }
  50% {
    height: 16px;
  }
}
</style>
