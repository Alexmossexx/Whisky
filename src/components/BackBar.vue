<script setup>
import { useRouter } from 'vue-router'
defineProps({ title: { type: String, default: '' } })
const router = useRouter()
</script>

<template>
  <div class="backbar">
    <button class="back" @click="router.back()">← BACK</button>
    <span class="title label-mono" v-if="title">{{ title }}</span>
    <span class="spacer"></span>
  </div>
</template>

<style scoped>
.backbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.back {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #c9a84c;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
}
.title {
  color: #4a4a4a;
}
.spacer {
  width: 48px;
}
</style>
