<template>
  <div class="anim-wash">
    <AppHeader title="选择生成路径" back />
    <div class="px">
      <!-- 三条路径 -->
      <div v-if="!mode" class="paths">
        <div class="path moss card-press" @click="recommend">
          <div class="p-title">🌿 综合推荐</div>
          <div class="p-desc">选维度 → AI 帮你选最佳模板</div>
          <div class="p-scene">适合：快速出图</div>
        </div>
        <div class="path oak card-press" @click="mode = 'custom'">
          <div class="p-title">✏️ 定制化</div>
          <div class="p-desc">你来选模板 + 写感受</div>
          <div class="p-scene">适合：精确控制</div>
        </div>
        <div class="path wax card-press" @click="random">
          <div class="p-title">🎲 随机抽卡</div>
          <div class="p-desc">抽一张 → 即刻生成</div>
          <div class="p-scene">适合：盲盒惊喜</div>
        </div>
      </div>

      <!-- 定制化：模板选择 + 感受 -->
      <div v-else-if="mode === 'custom'" class="custom">
        <div class="botanical-divider">选择模板</div>
        <div class="tpl-scroll scroll-x">
          <div
            v-for="t in templates"
            :key="t.key"
            class="tpl engrave-frame card-press"
            :class="{ on: tpl === t.key }"
            @click="tpl = t.key"
          >
            <div class="tpl-name font-bottle">
              {{ t.label }}<span v-if="t.isNew" class="new">NEW</span>
            </div>
            <div class="tpl-desc">{{ t.desc }}</div>
            <div class="tpl-scene latin">{{ t.scene }}</div>
          </div>
        </div>
        <div class="botanical-divider">写下你的感受（可选）</div>
        <textarea v-model="notes" class="notes specimen-label" rows="3" placeholder="例如：篝火边的夜晚，海风咸涩…"></textarea>
        <button class="btn-amber gen" @click="gen(tpl)">→ 生成品鉴卡</button>
      </div>
    </div>

    <div v-if="loading" class="overlay">
      <div class="loader">
        <div class="anim-loading glass"></div>
        <p class="font-botanical">琥珀沉淀中… AI 正在生成品鉴卡</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getWhisky, generateCard } from '../services/api'
import { TEMPLATES } from '../data/mock'
import { useCardStore } from '../store'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const cardStore = useCardStore()
const templates = TEMPLATES

const mode = ref('')
const tpl = ref('botanical')
const notes = ref('')
const loading = ref(false)

async function gen(template) {
  loading.value = true
  const source = await getWhisky(route.params.id)
  const card = await generateCard(source, template, notes.value)
  cardStore.add(card)
  loading.value = false
  router.replace(`/result/${card.id}`)
}
function recommend() {
  showToast('AI 推荐：复古植物图谱')
  gen('botanical')
}
function random() {
  const r = templates[Math.floor(Math.random() * templates.length)]
  showToast('🎲 抽中：' + r.label)
  gen(r.key)
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.paths {
  display: grid;
  gap: 14px;
  margin-top: 8px;
}
.path {
  background: #fbf6e7;
  border: 1.5px solid var(--oak);
  border-radius: 4px;
  padding: 18px;
}
.path.moss {
  border-color: var(--moss);
}
.path.wax {
  border-color: var(--amber);
}
.p-title {
  font-size: 22px;
  color: var(--oak);
}
.p-desc {
  margin: 6px 0;
  color: var(--ink);
}
.p-scene {
  color: var(--slate);
  font-size: 14px;
}
.tpl-scroll {
  display: flex;
  gap: 12px;
  padding-bottom: 6px;
}
.tpl {
  min-width: 160px;
  background: #fbf6e7;
  padding: 14px;
}
.tpl.on {
  box-shadow: 0 0 12px rgba(196, 148, 74, 0.5), inset 0 0 0 3px var(--parchment),
    inset 0 0 0 4px var(--amber);
}
.tpl-name {
  font-size: 19px;
  color: var(--oak);
}
.new {
  font-size: 10px;
  background: var(--moss);
  color: #fff;
  padding: 0 5px;
  border-radius: 3px;
  margin-left: 6px;
  vertical-align: middle;
}
.tpl-desc {
  font-size: 13px;
  margin: 4px 0;
}
.notes {
  width: 100%;
  padding: 12px;
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  resize: none;
  outline: none;
}
.gen {
  width: 100%;
  padding: 14px;
  margin: 20px 0;
  font-size: 17px;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 36, 22, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
}
.loader {
  text-align: center;
  color: var(--parchment);
}
.glass {
  width: 60px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 6px 6px 30px 30px;
  border: 2px solid var(--amber);
}
</style>
