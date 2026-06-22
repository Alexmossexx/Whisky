<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import BotanicalPlate from '../components/BotanicalPlate.vue'

const route = useRoute()
const router = useRouter()
const whisky = store.get(route.params.id)
if (!whisky) router.replace('/admin')

const formats = [
  { id: 'png', icon: '🖼', name: '静态图鉴', spec: '高清 PNG · 1080×1440', price: '¥0.5' },
  { id: 'gif', icon: '✨', name: '动态图鉴', spec: 'GIF · 植物生长 / 水彩晕开', price: '¥2' },
  { id: 'mp4', icon: '🎬', name: '视频图鉴', spec: 'MP4 竖版 9:16 · 含 BGM', price: '¥3' }
]
const picked = ref('mp4')
const stage = ref('idle') // idle | rendering | done
const progress = ref(0)

function render() {
  stage.value = 'rendering'
  progress.value = 0
  const timer = setInterval(() => {
    progress.value += Math.random() * 16
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer)
      setTimeout(() => (stage.value = 'done'), 300)
    }
  }, 200)
}
</script>

<template>
  <div class="page" v-if="whisky">
    <button class="link-back font-fell" @click="router.back()">← 返回</button>
    <span class="eyebrow font-fell">EXPORT · 一键导出</span>
    <h1 class="title font-title">{{ whisky.name }}</h1>

    <div class="preview-wrap" :class="{ anim: stage === 'rendering' || picked !== 'png' }">
      <BotanicalPlate :whisky="whisky" />
      <div v-if="picked === 'mp4'" class="film-bars"><span></span><span></span></div>
    </div>

    <hr class="rule-fancy">❦ 选择格式 ❦</hr>

    <div class="formats">
      <button
        v-for="f in formats"
        :key="f.id"
        class="fmt card"
        :class="{ on: picked === f.id }"
        @click="picked = f.id; stage = 'idle'"
      >
        <span class="fmt-icon">{{ f.icon }}</span>
        <span class="fmt-info">
          <strong class="font-title">{{ f.name }}</strong>
          <span class="font-body fmt-spec">{{ f.spec }}</span>
        </span>
        <span class="fmt-price price">{{ f.price }}</span>
      </button>
    </div>

    <div class="action">
      <button v-if="stage === 'idle'" class="btn moss" @click="render">
        生成 {{ formats.find(f => f.id === picked).name }}
      </button>

      <div v-else-if="stage === 'rendering'" class="rendering">
        <div class="bar"><div class="fill" :style="{ width: progress + '%' }"></div></div>
        <span class="font-fell">FFmpeg 合成中 · {{ Math.round(progress) }}%</span>
      </div>

      <div v-else class="done specimen">
        <span class="done-mark font-title">✓ 已生成</span>
        <span class="font-body">{{ whisky.name }}_{{ picked }}.{{ picked }} · 已存入下载</span>
        <div class="done-acts">
          <button class="btn amber" @click="stage = 'idle'">分享到小红书 / 抖音</button>
          <button class="btn-ghost" @click="stage = 'idle'">重新生成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-back {
  background: none; border: none; color: var(--oak);
  font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 8px;
}
.eyebrow { display: block; font-size: 11px; letter-spacing: 0.2em; color: var(--slate); }
.title { font-size: 26px; color: var(--oak); margin: 2px 0 16px; }

.preview-wrap {
  max-width: 280px; margin: 0 auto 18px; position: relative;
}
.preview-wrap.anim :deep(.plate) { animation: bloom 1s ease both; }
.film-bars span {
  position: absolute; left: -6px; right: -6px; height: 14px;
  background: repeating-linear-gradient(90deg, var(--ink) 0 6px, transparent 6px 14px);
  opacity: 0.5;
}
.film-bars span:first-child { top: -8px; }
.film-bars span:last-child { bottom: -8px; }

.formats { display: flex; flex-direction: column; gap: 10px; }
.fmt {
  display: flex; align-items: center; gap: 12px; padding: 12px;
  cursor: pointer; text-align: left;
}
.fmt.on { box-shadow: inset 0 0 0 2px var(--moss); background: rgba(74,107,58,0.06); }
.fmt-icon { font-size: 24px; }
.fmt-info { flex: 1; display: flex; flex-direction: column; }
.fmt-info strong { font-size: 17px; color: var(--oak); }
.fmt-spec { font-size: 12px; color: var(--slate); }
.fmt-price { font-size: 17px; }

.action { margin-top: 20px; }
.action > .btn { width: 100%; font-size: 17px; }

.rendering { text-align: center; }
.bar {
  height: 8px; background: rgba(123,139,111,0.3); border-radius: 4px;
  overflow: hidden; margin-bottom: 8px;
}
.fill {
  height: 100%; background: var(--moss);
  transition: width 0.3s ease;
}
.rendering span { font-size: 12px; letter-spacing: 0.1em; color: var(--slate); }

.done {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 16px;
}
.done-mark { font-size: 22px; color: var(--moss); }
.done span.font-body { font-size: 12px; color: var(--ink); }
.done-acts { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 6px; }
.done-acts .btn, .done-acts .btn-ghost { width: 100%; }
</style>
