<script setup>
// HERBARIUM — 电子酒单 (PRD v0.4)
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}
</style>
