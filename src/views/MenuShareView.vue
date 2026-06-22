<template>
  <div class="anim-wash" v-if="menu">
    <AppHeader title="分享酒单" back />
    <div class="px">
      <div class="preview-wrap engrave-frame">
        <img :src="longImg" class="long-img" />
      </div>
      <p class="hint font-botanical">完整酒单长图 · 含 Logo 与所有在架品鉴卡</p>

      <button class="share-btn" @click="download">📥 下载长图（发朋友圈）</button>
      <button class="share-btn" @click="copyLink">🔗 复制链接</button>
      <button class="share-btn" @click="exportVideo">🎬 导出视频（发小红书）</button>
      <button class="share-btn" @click="miniCode">📱 生成小程序码</button>
    </div>

    <div v-if="qr" class="sheet-mask" @click.self="qr = false">
      <div class="sheet specimen-label qr-sheet">
        <div class="sheet-title font-bottle">小程序码</div>
        <div class="qr">▦▦▦<br />▦ {{ menu.name }} ▦<br />▦▦▦</div>
        <p class="latin">可打印贴桌 / 放名片（演示占位）</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast, showNotify } from 'vant'
import { useMenuStore } from '../store'
import { generateMenuLongImage } from '../services/imagegen'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const menuStore = useMenuStore()
const menu = computed(() => menuStore.byId(route.params.id))
const longImg = computed(() => (menu.value ? generateMenuLongImage(menu.value) : ''))
const qr = ref(false)

function download() {
  const a = document.createElement('a')
  a.href = longImg.value
  a.download = menu.value.name + '-酒单.svg'
  a.click()
  showToast('长图已下载')
}
function copyLink() {
  const url = `${location.origin}${location.pathname}#/menu/${menu.value.id}`
  navigator.clipboard?.writeText(url)
  showToast('链接已复制：' + url)
}
function exportVideo() {
  showNotify({ type: 'primary', message: '视频合成（FFmpeg）需后端支持，演示版输出长图轮播脚本' })
}
function miniCode() {
  qr.value = true
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.preview-wrap {
  background: #fbf6e7;
  padding: 8px;
  max-height: 50vh;
  overflow-y: auto;
}
.long-img {
  width: 100%;
  display: block;
}
.hint {
  text-align: center;
  color: var(--slate);
  margin: 10px 0 16px;
}
.share-btn {
  width: 100%;
  background: #fbf6e7;
  border: 1.5px solid var(--oak);
  border-radius: 4px;
  padding: 14px;
  font-size: 16px;
  color: var(--oak);
  margin-bottom: 12px;
  font-family: 'EB Garamond', serif;
  cursor: pointer;
}
.sheet-mask {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 85;
}
.sheet {
  width: 80%;
  max-width: 320px;
  padding: 22px;
  border-radius: 8px;
  text-align: center;
}
.sheet-title {
  font-size: 20px;
  color: var(--oak);
  margin-bottom: 14px;
}
.qr {
  font-size: 26px;
  line-height: 1.6;
  color: var(--oak);
  letter-spacing: 4px;
}
</style>
