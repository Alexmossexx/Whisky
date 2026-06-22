<script setup>
import TabBar from './components/TabBar.vue'
import Bgm from './components/Bgm.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
// 结果/确认/模板页隐藏 TabBar，沉浸炼金流程
const showTab = computed(() => ['home', 'cabinet', 'collection'].includes(route.name))
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <TabBar v-if="showTab" />
    <Bgm />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}
</style>
