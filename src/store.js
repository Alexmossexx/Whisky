import { reactive, watch } from 'vue'

// 极简全局状态（替代 pinia，保持轻量）
const saved = JSON.parse(localStorage.getItem('wa_collection') || '[]')

export const store = reactive({
  selectedTemplate: 'acid-chrome',
  userNotes: '',
  collection: saved, // 我的图鉴：[{ id, name, cn, score, accent, template, ts }]

  addToCollection(entry) {
    if (this.collection.find((c) => c.ts === entry.ts)) return
    this.collection.unshift(entry)
  },
  removeFromCollection(ts) {
    this.collection = this.collection.filter((c) => c.ts !== ts)
  }
})

watch(
  () => store.collection,
  (v) => localStorage.setItem('wa_collection', JSON.stringify(v)),
  { deep: true }
)
