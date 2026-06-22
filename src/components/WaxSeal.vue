<template>
  <span class="seal" :style="{ background: color }" :title="label">
    <span class="seal-text">{{ text }}</span>
  </span>
</template>

<script setup>
defineProps({
  color: { type: String, default: '#7c2f2f' },
  text: { type: String, default: '' },
  label: { type: String, default: '' }
})
</script>

<style scoped>
.seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25), 0 1px 3px rgba(0, 0, 0, 0.3);
  color: #f0e3c0;
  font-size: 12px;
  font-family: 'IM Fell English', serif;
  flex-shrink: 0;
}
</style>
