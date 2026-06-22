// 模拟服务层（PRD 6.4 / 8.3 接口）。当前为前端 Mock + localStorage 持久化，
// 结构与真实 Node 后端一致，后续把每个函数替换为 fetch('/api/...') 即可。
import { KNOWLEDGE_BASE, regionOf } from '../data/mock'
import { generateCardImage, generateLogoImage } from './imagegen'

const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms))

// /api/search — 搜索酒款（多源抓取，降级到内置知识库）
export async function searchWhisky(keyword = '') {
  await delay(500)
  const k = keyword.trim().toLowerCase()
  if (!k) return KNOWLEDGE_BASE
  return KNOWLEDGE_BASE.filter(
    (w) =>
      w.whisky_name.toLowerCase().includes(k) ||
      (w.name_cn || '').toLowerCase().includes(k) ||
      w.distillery.toLowerCase().includes(k) ||
      regionOf(w.region).label.includes(k)
  )
}

export async function getWhisky(id) {
  await delay(200)
  return KNOWLEDGE_BASE.find((w) => w.id === id) || null
}

// /api/extract-flavors — 提炼风味（知识库已含，直接返回；置信度透传）
export async function extractFlavors(id) {
  await delay(600)
  const w = KNOWLEDGE_BASE.find((x) => x.id === id)
  if (!w) return null
  return { flavors: w.flavors, confidence: w.confidence }
}

// /api/generate-card — 生成品鉴卡（AI生图 · Seedream）
export async function generateCard(source, template = 'botanical', notes = '') {
  await delay(1200)
  const image_url = generateCardImage(source, template)
  return {
    id: 'card-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    user_id: 'me',
    whisky_name: source.whisky_name,
    name_cn: source.name_cn,
    distillery: source.distillery,
    region: source.region,
    age: source.age,
    abv: source.abv,
    cask_type: source.cask_type,
    score: source.score,
    latin: source.latin,
    flavors: source.flavors,
    confidence: source.confidence,
    template,
    image_url,
    notes,
    created_at: new Date().toISOString()
  }
}

// /api/logo/generate — AI生成 Logo（3个候选）
export async function generateLogo(name, style = 'engraving') {
  await delay(1100)
  return [0, 1, 2].map((seed) => ({
    seed,
    style,
    url: generateLogoImage(name, style, seed)
  }))
}
