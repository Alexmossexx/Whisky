<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import { templates, plants } from '../data/menu'
import BotanicalPlate from '../components/BotanicalPlate.vue'

const route = useRoute()
const router = useRouter()
const whisky = store.get(route.params.id)
if (!whisky) router.replace('/admin')

const tab = ref('recommend') // recommend | custom | random
const draftTemplate = ref(whisky?.template || 'curtis')
const rolling = ref(false)
const generated = ref(false)

// 路径1 综合推荐：选维度
const dims = reactive({ type: '雪莉', mood: '沉稳', plant: 'oakEU' })
const typeOpts = ['泥煤', '雪莉', '波本', '日威']
const moodOpts = ['沉稳', '明亮', '古朴', '清新']
const plantOpts = ['oakEU', 'barley', 'heather', 'peat', 'oakJP']

const recommendTpl = computed(() => {
  // 简易推荐逻辑：氛围/类型 → 模板
  if (dims.type === '日威') return 'honzo'
  if (dims.mood === '古朴') return 'herbarium'
  if (dims.mood === '明亮') return 'merian'
  return 'curtis'
})

// 预览用的临时酒款（不落库，确认才写）
const preview = computed(() => ({
  ...whisky,
  template: tab.value === 'recommend' ? recommendTpl.value : draftTemplate.value
}))

function roll() {
  rolling.value = true
  generated.value = false
  let ticks = 0
  const timer = setInterval(() => {
    draftTemplate.value = templates[Math.floor(Math.random() * templates.length)].id
    ticks++
    if (ticks > 8) {
      clearInterval(timer)
      rolling.value = false
      generated.value = true
    }
  }, 110)
}

function confirm() {
  store.update(whisky.id, { template: preview.value.template })
  router.push(`/admin/export/${whisky.id}`)
}
</script>

<template>
  <div class="page" v-if="whisky">
    <button class="link-back font-fell" @click="router.back()">← 返回</button>
    <span class="eyebrow font-fell">GENERATE · 生成植物图鉴</span>
    <h1 class="title font-title">{{ whisky.name }}</h1>

    <!-- 三条路径 tab -->
    <div class="tabs">
      <button :class="{ on: tab === 'recommend' }" @click="tab = 'recommend'; generated = false">综合推荐</button>
      <button :class="{ on: tab === 'custom' }" @click="tab = 'custom'; generated = false">定制化</button>
      <button :class="{ on: tab === 'random' }" @click="tab = 'random'; generated = false">随机抽卡</button>
    </div>

    <!-- 路径1 综合推荐 -->
    <div v-if="tab === 'recommend'" class="panel">
      <p class="hint font-body">选择维度，AI 综合判定最佳植物图谱模板。</p>
      <div class="dim">
        <label class="font-fell">酒款类型</label>
        <div class="opts">
          <button v-for="t in typeOpts" :key="t" :class="{ on: dims.type === t }" @click="dims.type = t">{{ t }}</button>
        </div>
      </div>
      <div class="dim">
        <label class="font-fell">氛围</label>
        <div class="opts">
          <button v-for="m in moodOpts" :key="m" :class="{ on: dims.mood === m }" @click="dims.mood = m">{{ m }}</button>
        </div>
      </div>
      <div class="result-line specimen">
        <span class="font-fell">推荐模板</span>
        <strong class="font-title">{{ templates.find(t => t.id === recommendTpl).cn }}</strong>
      </div>
    </div>

    <!-- 路径2 定制化 -->
    <div v-else-if="tab === 'custom'" class="panel">
      <p class="hint font-body">逐项指定风格模板，精确控制生成。</p>
      <div class="tpl-grid">
        <button
          v-for="t in templates"
          :key="t.id"
          class="tpl"
          :class="{ on: draftTemplate === t.id }"
          :style="{ '--a': t.accent }"
          @click="draftTemplate = t.id"
        >
          <span class="tpl-name font-title">{{ t.name }}</span>
          <span class="tpl-cn">{{ t.cn }}</span>
          <span class="tpl-desc font-body">{{ t.desc }}</span>
        </button>
      </div>
    </div>

    <!-- 路径3 随机抽卡 -->
    <div v-else class="panel random">
      <p class="hint font-body">盲盒逻辑 · 随机匹配植物元素与风格。</p>
      <button class="btn amber roll-btn" :disabled="rolling" @click="roll">
        {{ rolling ? '抽取中…' : '🎴 抽一张' }}
      </button>
      <p v-if="generated" class="rolled font-title">
        ✦ {{ templates.find(t => t.id === draftTemplate).cn }} ✦
      </p>
    </div>

    <hr class="rule-fancy">❦ 预览 PREVIEW ❦</hr>

    <div class="preview-wrap" :class="{ rolling }">
      <BotanicalPlate :whisky="preview" />
    </div>

    <button class="btn moss confirm" @click="confirm">确认生成 · 去导出 →</button>
  </div>
</template>

<style scoped>
.link-back {
  background: none; border: none; color: var(--oak);
  font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 8px;
}
.eyebrow { display: block; font-size: 11px; letter-spacing: 0.2em; color: var(--slate); }
.title { font-size: 26px; color: var(--oak); margin: 2px 0 16px; }

.tabs {
  display: flex;
  border: 1px solid var(--oak);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 16px;
}
.tabs button {
  flex: 1;
  background: none;
  border: none;
  border-right: 1px solid var(--oak);
  padding: 10px 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--oak);
  cursor: pointer;
}
.tabs button:last-child { border-right: none; }
.tabs button.on { background: var(--oak); color: var(--parchment); }

.panel { margin-bottom: 16px; }
.hint { font-size: 14px; color: var(--ink); margin: 0 0 14px; }
.dim { margin-bottom: 14px; }
.dim label, .panel label.font-fell {
  display: block; font-size: 11px; letter-spacing: 0.12em;
  color: var(--slate); margin-bottom: 6px;
}
.opts { display: flex; flex-wrap: wrap; gap: 6px; }
.opts button {
  border: 1px solid var(--dried); background: none; color: var(--oak);
  border-radius: 2px; padding: 6px 14px; font-size: 14px; cursor: pointer;
  font-family: 'EB Garamond', serif;
}
.opts button.on { background: var(--moss); color: var(--parchment); border-color: var(--moss); }

.result-line {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 6px;
}
.result-line span { font-size: 11px; letter-spacing: 0.12em; color: var(--slate); }
.result-line strong { font-size: 18px; color: var(--oak); }

.tpl-grid { display: flex; flex-direction: column; gap: 10px; }
.tpl {
  border: 1px solid var(--dried); border-left: 4px solid var(--a);
  background: rgba(255,252,240,0.5); border-radius: 2px;
  padding: 12px; cursor: pointer; text-align: left;
  display: flex; flex-direction: column; gap: 2px;
}
.tpl.on { border-color: var(--a); background: rgba(196,148,74,0.08); box-shadow: inset 0 0 0 1px var(--a); }
.tpl-name { font-size: 18px; font-weight: 600; color: var(--oak); }
.tpl-cn { font-size: 13px; color: var(--moss); }
.tpl-desc { font-size: 12px; color: var(--slate); }

.random { text-align: center; }
.roll-btn { width: 100%; font-size: 18px; padding: 16px; }
.rolled { font-size: 22px; color: var(--moss); margin: 14px 0 0; animation: bloom 0.6s both; }

.preview-wrap {
  max-width: 300px; margin: 0 auto 20px;
  transition: filter 0.2s;
}
.preview-wrap.rolling { filter: blur(3px) saturate(0.7); }
.confirm { width: 100%; font-size: 17px; }
</style>
