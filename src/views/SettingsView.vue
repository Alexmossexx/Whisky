<template>
  <div class="anim-wash">
    <AppHeader title="我的 · 个人设置" />
    <div class="px">
      <div class="profile specimen-label">
        <img v-if="profile.logo_url" :src="profile.logo_url" class="avatar" />
        <div v-else class="avatar placeholder">🕯️</div>
        <div>
          <div class="nick font-bottle">{{ profile.nickname }}</div>
          <div class="latin">{{ planLabel }}</div>
        </div>
      </div>

      <label class="lbl">昵称</label>
      <input v-model="profile.nickname" class="inp" @change="save" />

      <label class="lbl">简介</label>
      <textarea v-model="profile.bio" class="inp" rows="2" @change="save"></textarea>

      <label class="lbl">个人 Logo（AI 生成）</label>
      <div class="logo-row">
        <div class="style-pick">
          <button
            v-for="s in logoStyles"
            :key="s.key"
            class="style-btn"
            :class="{ on: style === s.key }"
            @click="style = s.key"
          >
            {{ s.label }}
          </button>
        </div>
        <button class="btn-amber" @click="genLogo" :disabled="loading">
          {{ loading ? '生成中…' : '🌿 AI 生成个人 Logo' }}
        </button>
        <div v-if="cands.length" class="cands">
          <img v-for="c in cands" :key="c.seed" :src="c.url" class="cand" @click="apply(c)" />
        </div>
      </div>

      <div class="botanical-divider">订阅状态</div>
      <div class="plans">
        <div
          v-for="p in plans"
          :key="p.key"
          class="plan"
          :class="{ on: profile.plan === p.key }"
          @click="setPlan(p.key)"
        >
          <div class="plan-name font-bottle">{{ p.name }}</div>
          <div class="plan-price price-tag">{{ p.price }}</div>
          <div class="plan-feat latin">{{ p.feat }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useSettingsStore } from '../store'
import { generateLogo } from '../services/api'
import { LOGO_STYLES } from '../data/mock'
import AppHeader from '../components/AppHeader.vue'

const store = useSettingsStore()
const profile = store.profile
const logoStyles = LOGO_STYLES

const style = ref('wax_seal')
const cands = ref([])
const loading = ref(false)

const plans = [
  { key: 'free', name: '免费版', price: '¥0', feat: '图鉴3张/月 · 1个酒单' },
  { key: 'explore', name: '探索版', price: '¥9.9/月', feat: '无限基础 · 3个酒单 · AI Logo' },
  { key: 'pro', name: '专业版', price: '¥29.9/月', feat: '无限量 · 无限酒单 · MP4' },
  { key: 'flagship', name: '旗舰版', price: '¥99/月', feat: '品牌定制 · 专属域名 · 批量' }
]
const planLabel = computed(() => plans.find((p) => p.key === profile.plan)?.name)

function save() {
  store.update({ nickname: profile.nickname, bio: profile.bio })
}
async function genLogo() {
  loading.value = true
  cands.value = await generateLogo(profile.nickname, style.value)
  loading.value = false
}
function apply(c) {
  store.update({ logo_url: c.url })
  cands.value = []
  showToast('个人 Logo 已更新')
}
function setPlan(k) {
  store.update({ plan: k })
  showToast('已切换到' + plans.find((p) => p.key === k).name)
}
</script>

<style scoped>
.px {
  padding: 0 16px;
}
.profile {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px;
}
.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 1.5px solid var(--oak);
  border-radius: 50%;
}
.avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: #f1e7cc;
}
.nick {
  font-size: 22px;
  color: var(--oak);
}
.lbl {
  display: block;
  color: var(--oak);
  margin: 14px 0 6px;
}
.inp {
  width: 100%;
  padding: 11px;
  border: 1px dashed var(--dryflower);
  background: #fbf6e7;
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  outline: none;
  border-radius: 3px;
}
.style-pick {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.style-btn {
  flex: 1;
  background: none;
  border: 1px solid var(--slate);
  border-radius: 4px;
  padding: 7px 4px;
  font-size: 13px;
  color: var(--slate);
  cursor: pointer;
}
.style-btn.on {
  border-color: var(--amber);
  color: var(--amber);
}
.btn-amber {
  width: 100%;
  padding: 11px;
}
.cands {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
.cand {
  width: 33%;
  border: 1px solid var(--dryflower);
  cursor: pointer;
}
.plans {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.plan {
  background: #fbf6e7;
  border: 1.5px solid var(--slate);
  border-radius: 4px;
  padding: 14px;
  cursor: pointer;
}
.plan.on {
  border-color: var(--amber);
  box-shadow: 0 0 10px rgba(196, 148, 74, 0.4);
}
.plan-name {
  font-size: 18px;
  color: var(--oak);
}
.plan-price {
  font-size: 18px;
  margin: 4px 0;
}
.plan-feat {
  font-size: 12px;
}
</style>
