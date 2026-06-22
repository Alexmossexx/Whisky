<script setup>
import { useRouter } from 'vue-router'
import { whiskies } from '../data/whiskies'

const router = useRouter()

// 分层金属陈列舱：每层 3 瓶
const shelves = [whiskies.slice(0, 3), whiskies.slice(3, 6), whiskies.slice(6, 8)]

function tap(id) {
  router.push(`/confirm/${id}`)
}
</script>

<template>
  <div class="page">
    <button class="back" @click="router.push('/')">← BACK</button>

    <header class="vault-head rise">
      <h1 class="brand-title v-title">THE VAULT</h1>
      <p class="v-sub label-mono">WHISKY CABINET · 暗黑金属酒窖</p>
    </header>

    <div
      v-for="(shelf, si) in shelves"
      :key="si"
      class="shelf panel brushed rise"
      :style="{ animationDelay: 0.1 + si * 0.18 + 's' }"
    >
      <div class="shelf-light"></div>
      <div class="bottles">
        <button
          v-for="w in shelf"
          :key="w.id"
          class="bottle"
          :style="{ '--ac': w.accent }"
          @click="tap(w.id)"
        >
          <div class="bottle-body">
            <div class="bottle-shine"></div>
          </div>
          <span class="bottle-name label-mono">{{ w.distillery }}</span>
        </button>
      </div>
      <div class="shelf-rail"></div>
    </div>
  </div>
</template>

<style scoped>
.back {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #c9a84c;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}
.vault-head {
  margin-bottom: 26px;
}
.v-title {
  font-size: 38px;
  letter-spacing: 0.16em;
}
.v-sub {
  margin-top: 10px;
  color: #6a6a6a;
  letter-spacing: 0.22em;
}

.shelf {
  margin-bottom: 22px;
  padding: 22px 16px 12px;
  position: relative;
  overflow: hidden;
}
.shelf-light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ffd1, transparent);
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
  box-shadow: 0 0 10px rgba(0, 255, 209, 0.5);
}
.bottles {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.bottle {
  --ac: #c9a84c;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.25s ease;
}
.bottle:active {
  transform: translateY(-6px) rotate(360deg);
}
.bottle-body {
  width: 30px;
  height: 70px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.4));
  border: 1px solid var(--ac);
  border-radius: 4px 4px 6px 6px;
  position: relative;
  box-shadow: 0 0 14px var(--ac), inset 0 0 8px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.bottle-body::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 12px;
  background: var(--ac);
  border-radius: 2px;
  box-shadow: 0 0 8px var(--ac);
}
.bottle-shine {
  position: absolute;
  top: 8px;
  left: 5px;
  width: 4px;
  height: 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), transparent);
  border-radius: 2px;
  filter: blur(1px);
}
.bottle-name {
  font-size: 9px;
  color: var(--ac);
  text-shadow: 0 0 6px currentColor;
}
.shelf-rail {
  margin-top: 14px;
  height: 4px;
  background: linear-gradient(90deg, #8b6914, #c9a84c, #8b6914);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}
</style>
