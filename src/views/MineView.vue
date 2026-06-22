<template>
  <div class="anim-wash">
    <AppHeader :title="`我的图鉴 (${cards.length})`" />
    <div class="px">
      <div v-if="cards.length" class="grid">
        <div
          v-for="c in cards"
          :key="c.id"
          class="card engrave-frame card-press"
          @click="$router.push(`/result/${c.id}`)"
        >
          <img :src="c.image_url" class="thumb" />
          <div class="c-name font-bottle">{{ c.name_cn || c.whisky_name }}</div>
          <div class="c-date latin">{{ fmt(c.created_at) }}</div>
        </div>
      </div>
      <div v-else class="empty specimen-label">
        暂无品鉴卡<br />
        <button class="btn-amber go" @click="$router.push('/')">去生成第一张 →</button>
      </div>

      <button v-if="cards.length" class="btn-oak add-menu" @click="$router.push('/menu')">
        📋 加入酒单
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCardStore } from '../store'
import AppHeader from '../components/AppHeader.vue'

const cardStore = useCardStore()
const cards = computed(() => cardStore.cards)
function fmt(d) {
  const t = new Date(d)
  return `${t.getMonth() + 1}/${t.getDate()}`
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.grid {
  columns: 2;
  column-gap: 12px;
}
.card {
  break-inside: avoid;
  background: #fbf6e7;
  padding: 6px;
  margin-bottom: 12px;
}
.thumb {
  width: 100%;
  display: block;
}
.c-name {
  font-size: 16px;
  color: var(--oak);
  text-align: center;
  margin-top: 4px;
}
.c-date {
  text-align: center;
  font-size: 12px;
}
.empty {
  text-align: center;
  padding: 40px 16px;
  color: var(--slate);
}
.go {
  margin-top: 14px;
  padding: 10px 18px;
}
.add-menu {
  width: 100%;
  padding: 13px;
  margin: 16px 0;
}
</style>
