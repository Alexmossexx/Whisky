import { reactive } from 'vue'
import { inventory } from './data/menu'

// 电子酒单状态：商家库存的增删改 / 上下架 / 排序
const KEY = 'herbarium_menu'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore */
  }
  return JSON.parse(JSON.stringify(inventory))
}

export const store = reactive({
  list: load(),

  persist() {
    localStorage.setItem(KEY, JSON.stringify(this.list))
  },
  get(id) {
    return this.list.find((w) => w.id === id)
  },
  get available() {
    return this.list.filter((w) => w.available)
  },
  toggle(id) {
    const w = this.get(id)
    if (w) w.available = !w.available
    this.persist()
  },
  update(id, patch) {
    const w = this.get(id)
    if (w) Object.assign(w, patch)
    this.persist()
  },
  remove(id) {
    const i = this.list.findIndex((w) => w.id === id)
    if (i >= 0) this.list.splice(i, 1)
    this.persist()
  },
  move(id, dir) {
    const i = this.list.findIndex((w) => w.id === id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= this.list.length) return
    const [item] = this.list.splice(i, 1)
    this.list.splice(j, 0, item)
    this.persist()
  },
  add(w) {
    this.list.unshift(w)
    this.persist()
  },
  reset() {
    this.list = JSON.parse(JSON.stringify(inventory))
    this.persist()
  }
})
