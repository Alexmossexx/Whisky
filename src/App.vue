<template>
  <div class="page">
    <BgmToggle />
    <router-view v-slot="{ Component }">
      <transition name="wash" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <TabBar v-if="showTab" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'
import BgmToggle from './components/BgmToggle.vue'

const route = useRoute()
// 分享/公开视图不显示底部导航
const hideOn = ['menu-public', 'menu-share']
const showTab = computed(() => !hideOn.includes(route.name))
</script>

<style>
.wash-enter-active,
.wash-leave-active {
  transition: opacity 0.45s ease, filter 0.45s ease;
}
.wash-enter-from,
.wash-leave-to {
  opacity: 0;
  filter: blur(4px);
}
</style>
