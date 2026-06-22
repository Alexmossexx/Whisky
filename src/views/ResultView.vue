<template>
  <div class="anim-wash" v-if="card">
    <AppHeader title="" back />
    <div class="px">
      <div
        class="card-wrap engrave-frame card-press"
        :class="{ floating }"
        @click="preview = true"
        @touchstart="onPress"
        @touchend="onRelease"
      >
        <img :src="card.image_url" class="card-img" />
      </div>
      <p class="hint font-botanical">点触放大 · 长按微交互</p>

      <div class="actions">
        <button class="act" @click="save">📥 保存</button>
        <button class="act" @click="share">🔗 分享</button>
        <button class="act" @click="showMenuPick = true">📋 酒单</button>
        <button class="act" @click="$router.push('/export')">🎬 导出</button>
        <button class="act wide" @click="$router.push(`/path/${srcId}`)">⟳ 换模板</button>
      </div>
    </div>

    <!-- 全屏预览 -->
    <div v-if="preview" class="preview" @click="preview = false">
      <img :src="card.image_url" class="preview-img" />
    </div>

    <!-- 加入酒单 -->
    <div v-if="showMenuPick" class="sheet-mask" @click.self="showMenuPick = false">
      <div class="sheet specimen-label">
        <div class="sheet-title font-bottle">加入酒单</div>
        <div v-if="!menus.length" class="empty">还没有酒单</div>
        <div
          v-for="m in menus"
          :key="m.id"
          class="menu-opt card-press"
          @click="addTo(m)"
        >
          🌿 {{ m.name }} <span class="latin">{{ m.bottles.length }} 瓶</span>
        </div>
        <button class="btn-amber new-menu" @click="createAndAdd">+ 新建酒单并加入</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useCardStore, useMenuStore } from '../store'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const cardStore = useCardStore()
const menuStore = useMenuStore()

const card = computed(() => cardStore.byId(route.params.cardId))
const srcId = computed(() => (card.value?.whisky_name ? findSrc() : ''))
const menus = computed(() => menuStore.menus)

const preview = ref(false)
const floating = ref(false)
const showMenuPick = ref(false)
let pressTimer = null

function findSrc() {
  // 由名称粗略反查知识库 id 供「换模板」用
  return 'kb-' + (card.value?.whisky_name || '').toLowerCase().split(' ')[0]
}
function onPress() {
  pressTimer = setTimeout(() => (floating.value = true), 800)
}
function onRelease() {
  clearTimeout(pressTimer)
  setTimeout(() => (floating.value = false), 600)
}
function save() {
  const a = document.createElement('a')
  a.href = card.value.image_url
  a.download = (card.value.name_cn || card.value.whisky_name) + '.svg'
  a.click()
  showToast('已保存到本地')
}
function share() {
  navigator.clipboard?.writeText(location.href)
  showToast('链接已复制')
}
function addTo(m) {
  menuStore.addBottle(m.id, card.value)
  showMenuPick.value = false
  showToast('已加入「' + m.name + '」')
}
function createAndAdd() {
  const m = menuStore.create({ name: '我的收藏', description: '' })
  menuStore.addBottle(m.id, card.value)
  showMenuPick.value = false
  router.push(`/menu/${m.id}/edit`)
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.card-wrap {
  background: #fbf6e7;
  padding: 8px;
  transition: transform 0.6s ease;
}
.card-wrap.floating {
  transform: translateY(-2px) scale(1.01);
}
.card-img {
  width: 100%;
  display: block;
}
.hint {
  text-align: center;
  color: var(--slate);
  margin: 10px 0 16px;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.act {
  background: #fbf6e7;
  border: 1.5px solid var(--oak);
  border-radius: 4px;
  padding: 13px;
  font-size: 16px;
  color: var(--oak);
  font-family: 'EB Garamond', serif;
  cursor: pointer;
}
.act.wide {
  grid-column: 1 / 3;
}
.preview {
  position: fixed;
  inset: 0;
  background: rgba(28, 24, 19, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90;
}
.preview-img {
  max-width: 92%;
  max-height: 90%;
}
.sheet-mask {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 85;
}
.sheet {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 18px;
  border-radius: 12px 12px 0 0;
}
.sheet-title {
  font-size: 20px;
  color: var(--oak);
  margin-bottom: 10px;
}
.menu-opt {
  padding: 12px;
  border-bottom: 1px dashed var(--dryflower);
  display: flex;
  justify-content: space-between;
}
.new-menu {
  width: 100%;
  padding: 12px;
  margin-top: 14px;
}
.empty {
  color: var(--slate);
  padding: 10px 0;
  font-style: italic;
}
</style>
