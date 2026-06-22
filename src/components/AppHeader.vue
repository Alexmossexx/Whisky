<template>
  <header class="hdr">
    <button v-if="back" class="back" @click="$router.back()">←</button>
    <h1 class="ttl font-brand">{{ title }}</h1>
    <div class="right"><slot name="right" /></div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  back: { type: Boolean, default: false }
})
</script>

<style scoped>
.hdr {
  display: flex;
  align-items: center;
  padding: 16px 16px 6px;
  gap: 10px;
}
.back {
  background: none;
  border: none;
  font-size: 22px;
  color: var(--oak);
  cursor: pointer;
}
.ttl {
  flex: 1;
  font-size: 20px;
  color: var(--oak);
  margin: 0;
}
.right {
  min-width: 24px;
  text-align: right;
}
</style>
