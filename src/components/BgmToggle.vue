<template>
  <button class="bgm" :class="{ on: store.bgmOn }" @click="toggle" title="背景音乐">
    {{ store.bgmOn ? '♪' : '♪̶' }}
  </button>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { useSettingsStore } from '../store'

const store = useSettingsStore()
let ctx = null
let timer = null

// 古典吉他/竖琴风格的程序化合成 BGM（Web Audio API，PRD 2.10）
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33] // C 大调五声 +

function pluck(freq, t) {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'triangle'
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.18, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 1.7)
}

function loop() {
  const now = ctx.currentTime
  for (let i = 0; i < 4; i++) {
    const f = SCALE[Math.floor(Math.random() * SCALE.length)] / (Math.random() > 0.6 ? 1 : 2)
    pluck(f, now + i * 0.55)
  }
}

function toggle() {
  store.toggleBgm()
  if (store.bgmOn) {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    ctx.resume()
    loop()
    timer = setInterval(loop, 2200)
  } else {
    clearInterval(timer)
    timer = null
  }
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.bgm {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 60;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--oak);
  background: #f1e7cc;
  color: var(--slate);
  font-size: 16px;
  cursor: pointer;
}
.bgm.on {
  color: var(--amber);
  border-color: var(--amber);
  box-shadow: 0 0 10px rgba(196, 148, 74, 0.5);
}
</style>
