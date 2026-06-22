<template>
  <div class="anim-wash">
    <AppHeader title="我的酒单" />
    <div class="px">
      <button class="btn-amber create" @click="showCreate = true">→ 创建新酒单</button>

      <div v-if="menus.length" class="list">
        <div v-for="m in menus" :key="m.id" class="menu-card specimen-label anim-grow">
          <div class="m-head">
            <img v-if="m.logo_url" :src="m.logo_url" class="m-logo" />
            <div v-else class="m-logo placeholder">🌿</div>
            <div>
              <div class="m-name font-bottle">{{ m.name }}</div>
              <div class="latin">{{ m.bottles.length }} 瓶 · {{ regionCount(m) }} 个产区</div>
            </div>
          </div>
          <div class="m-actions">
            <button @click="$router.push(`/menu/${m.id}/edit`)">编辑</button>
            <button @click="$router.push(`/menu/${m.id}/share`)">分享</button>
            <button @click="$router.push(`/menu/${m.id}`)">预览</button>
          </div>
        </div>
      </div>
      <div v-else class="empty specimen-label">还没有酒单，创建一个推荐给朋友吧</div>

      <button class="from-cards font-botanical" @click="$router.push('/mine')">
        💡 从图鉴添加 →
      </button>
    </div>

    <!-- 创建弹窗 -->
    <div v-if="showCreate" class="sheet-mask" @click.self="showCreate = false">
      <div class="sheet specimen-label">
        <div class="sheet-title font-bottle">创建新酒单</div>
        <input v-model="name" class="inp" placeholder="酒单名称，如「老王的私藏推荐」" />
        <textarea v-model="desc" class="inp" rows="2" placeholder="简介（可选）"></textarea>
        <button class="btn-amber" @click="create">创建</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()
const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const showCreate = ref(false)
const name = ref('')
const desc = ref('')

function regionCount(m) {
  return new Set(m.bottles.map((b) => b.region)).size
}
function create() {
  const m = menuStore.create({ name: name.value, description: desc.value })
  showCreate.value = false
  name.value = ''
  desc.value = ''
  router.push(`/menu/${m.id}/edit`)
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.create {
  width: 100%;
  padding: 14px;
  font-size: 17px;
  margin-bottom: 16px;
}
.list {
  display: grid;
  gap: 14px;
}
.menu-card {
  padding: 14px;
}
.m-head {
  display: flex;
  gap: 12px;
  align-items: center;
}
.m-logo {
  width: 54px;
  height: 54px;
  object-fit: cover;
  border: 1px solid var(--dryflower);
}
.m-logo.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  background: #f1e7cc;
}
.m-name {
  font-size: 20px;
  color: var(--oak);
}
.m-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  border-top: 1px dashed var(--dryflower);
  padding-top: 10px;
}
.m-actions button {
  flex: 1;
  background: none;
  border: 1px solid var(--oak);
  border-radius: 4px;
  padding: 7px;
  color: var(--oak);
  cursor: pointer;
}
.from-cards {
  display: block;
  margin: 18px auto;
  background: none;
  border: none;
  color: var(--moss);
  font-size: 16px;
  cursor: pointer;
}
.empty {
  text-align: center;
  padding: 30px;
  color: var(--slate);
  font-style: italic;
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
  margin-bottom: 12px;
}
.inp {
  width: 100%;
  padding: 11px;
  margin-bottom: 12px;
  border: 1px dashed var(--dryflower);
  background: #fbf6e7;
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  outline: none;
  border-radius: 3px;
}
.btn-amber {
  width: 100%;
  padding: 12px;
}
</style>
