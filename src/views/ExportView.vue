<template>
  <div class="anim-wash">
    <AppHeader title="导出" back />
    <div class="px">
      <div class="botanical-divider">选择品鉴卡</div>
      <div v-if="cards.length" class="grid">
        <div
          v-for="c in cards"
          :key="c.id"
          class="card engrave-frame card-press"
          :class="{ on: picked.includes(c.id) }"
          @click="toggle(c.id)"
        >
          <img :src="c.image_url" class="thumb" />
          <div class="check" v-if="picked.includes(c.id)">✓</div>
        </div>
      </div>
      <div v-else class="empty specimen-label">暂无品鉴卡可导出</div>

      <div class="botanical-divider">选择格式</div>
      <div class="formats">
        <button
          v-for="f in formats"
          :key="f.key"
          class="fmt"
          :class="{ on: format === f.key }"
          @click="format = f.key"
        >
          {{ f.label }}<small>{{ f.note }}</small>
        </button>
      </div>

      <button class="btn-amber export" :disabled="!picked.length" @click="doExport">
        下载（{{ picked.length }} 张 · {{ format.toUpperCase() }}）
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast, showNotify } from 'vant'
import { useCardStore } from '../store'
import AppHeader from '../components/AppHeader.vue'

const cardStore = useCardStore()
const cards = computed(() => cardStore.cards)

const picked = ref([])
const format = ref('png')
const formats = [
  { key: 'png', label: 'PNG', note: '静态图' },
  { key: 'gif', label: 'GIF', note: '动态' },
  { key: 'mp4', label: 'MP4', note: '竖版视频' }
]

function toggle(id) {
  picked.value.includes(id)
    ? (picked.value = picked.value.filter((x) => x !== id))
    : picked.value.push(id)
}
function doExport() {
  if (format.value === 'png') {
    picked.value.forEach((id) => {
      const c = cardStore.byId(id)
      const a = document.createElement('a')
      a.href = c.image_url
      a.download = (c.name_cn || c.whisky_name) + '.svg'
      a.click()
    })
    showToast('已导出 ' + picked.value.length + ' 张')
  } else {
    showNotify({
      type: 'primary',
      message: `${format.value.toUpperCase()} 合成（FFmpeg/Canvas录制）需后端支持，演示版仅 PNG 直出`
    })
  }
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.card {
  position: relative;
  background: #fbf6e7;
  padding: 4px;
}
.card.on {
  box-shadow: 0 0 12px var(--amber);
}
.thumb {
  width: 100%;
  display: block;
}
.check {
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--amber);
  color: #fff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.formats {
  display: flex;
  gap: 10px;
}
.fmt {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: #fbf6e7;
  border: 1.5px solid var(--slate);
  border-radius: 4px;
  padding: 12px;
  color: var(--slate);
  cursor: pointer;
}
.fmt small {
  font-size: 11px;
}
.fmt.on {
  border-color: var(--amber);
  color: var(--amber);
}
.export {
  width: 100%;
  padding: 14px;
  margin: 20px 0;
}
.empty {
  text-align: center;
  padding: 24px;
  color: var(--slate);
  font-style: italic;
}
</style>
