// 模拟「豆包 Seedream 5.0」生图：用 SVG 程序化合成复古植物图谱风格的
// 品鉴卡 / 酒单 Logo。真实后端接入时，把这些函数替换为 /api/generate-card
// 与 /api/logo/generate 的网络请求即可（返回 image_url）。
import { regionOf } from '../data/mock'

const PALETTE = {
  parchment: '#F5EDD6',
  oak: '#5C3D2E',
  moss: '#4A6B3A',
  amber: '#C4944A',
  slate: '#7B8B6F',
  dryflower: '#B8937A',
  ink: '#2C2416'
}

function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function svgToDataUri(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

// 一支铜版画风格的植物小枝 SVG path 组
function sprig(x, y, scale, color) {
  return `<g transform="translate(${x},${y}) scale(${scale})" stroke="${color}" stroke-width="1.4" fill="none" opacity="0.85">
    <path d="M0,0 C-2,-30 2,-60 0,-95"/>
    ${[0, 1, 2, 3, 4]
      .map((i) => {
        const ly = -18 - i * 16
        const dir = i % 2 === 0 ? 1 : -1
        return `<path d="M0,${ly} C${dir * 14},${ly - 4} ${dir * 22},${ly - 14} ${dir * 16},${ly - 22}" />`
      })
      .join('')}
    <circle cx="0" cy="-95" r="3" fill="${color}"/>
  </g>`
}

function frame(w, h) {
  return `<rect x="10" y="10" width="${w - 20}" height="${h - 20}" fill="none" stroke="${PALETTE.oak}" stroke-width="2"/>
    <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${PALETTE.oak}" stroke-width="0.8" opacity="0.6"/>`
}

const TEMPLATE_BG = {
  ink: { bg: '#1c1813', fg: PALETTE.amber, sub: '#d9c39a' },
  botanical: { bg: PALETTE.parchment, fg: PALETTE.oak, sub: PALETTE.moss },
  watercolor: { bg: '#f3efe6', fg: '#5b6e57', sub: PALETTE.dryflower },
  social: { bg: PALETTE.parchment, fg: PALETTE.oak, sub: PALETTE.amber },
  ghibli: { bg: '#eaf1e4', fg: '#3c5a48', sub: PALETTE.amber }
}

// 生成品鉴卡图片（data URI）
export function generateCardImage(card, template = 'botanical') {
  const W = 600
  const H = 800
  const t = TEMPLATE_BG[template] || TEMPLATE_BG.botanical
  const r = regionOf(card.region)
  const flavors = card.flavors || { nose: [], palate: [], finish: [] }

  const flavorBlock = (icon, label, list, y) =>
    `<text x="60" y="${y}" font-family="Georgia, serif" font-size="22" fill="${t.sub}">${icon} ${label}</text>
     <text x="60" y="${y + 30}" font-family="Georgia, serif" font-size="20" fill="${t.fg}">${esc(
      (list || []).join(' · ')
    )}</text>`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${t.bg}"/>
    <rect width="${W}" height="${H}" fill="url(#noise)" opacity="0.04"/>
    <defs><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter></defs>
    ${frame(W, H)}
    ${sprig(90, 250, 1.2, t.sub)}
    ${sprig(W - 90, 250, 1.2, t.sub)}
    <text x="${W / 2}" y="80" text-anchor="middle" font-family="'IM Fell English', Georgia, serif" font-size="26" letter-spacing="6" fill="${
      t.fg
    }">WHISKY ATLAS</text>
    <line x1="60" y1="100" x2="${W - 60}" y2="100" stroke="${t.sub}" stroke-width="1"/>
    <text x="${W / 2}" y="300" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="40" fill="${
      t.fg
    }">${esc(card.name_cn || card.whisky_name)}</text>
    <text x="${W / 2}" y="335" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="18" fill="${
      t.sub
    }">${esc(card.latin || r.latin)}</text>
    <text x="${W / 2}" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${t.sub}">${esc(
    card.distillery
  )} · ${esc(r.label)} · ${card.age ? card.age + '年' : 'NAS'} · ${card.abv || '—'}%</text>
    ${flavorBlock('🌹', '香气 NOSE', flavors.nose, 460)}
    ${flavorBlock('👅', '口感 PALATE', flavors.palate, 560)}
    ${flavorBlock('✨', '余韵 FINISH', flavors.finish, 660)}
    <circle cx="${W / 2}" cy="745" r="26" fill="none" stroke="${t.sub}" stroke-width="1.5"/>
    <text x="${W / 2}" y="752" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${
      t.fg
    }">${card.score || '—'}</text>
  </svg>`
  return svgToDataUri(svg)
}

// 生成酒单分享长图（竖版，含 Logo + 所有在架酒款）— 发朋友圈用
export function generateMenuLongImage(menu) {
  const W = 600
  const items = (menu.bottles || []).filter((b) => b.status !== 'off')
  const rowH = 92
  const H = 260 + items.length * rowH + 70
  const rows = items
    .map((b, i) => {
      const y = 240 + i * rowH
      const c = b.card || {}
      const r = regionOf(c.region)
      return `<g transform="translate(0,${y})">
        <rect x="40" y="0" width="${W - 80}" height="${rowH - 14}" fill="#fbf6e7" stroke="${
        PALETTE.dryflower
      }" stroke-width="1" stroke-dasharray="5 4"/>
        <text x="62" y="30" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="26" fill="${
          PALETTE.oak
        }">${esc(c.name_cn || c.whisky_name || '')}</text>
        <text x="62" y="56" font-family="Georgia, serif" font-style="italic" font-size="15" fill="${
          PALETTE.slate
        }">${esc(r.label)} · ${esc(c.latin || '')}</text>
        <text x="${W - 62}" y="44" text-anchor="end" font-family="'Cormorant Garamond', serif" font-size="24" fill="${
        PALETTE.amber
      }">${b.cup_price ? '¥' + b.cup_price + '/杯' : ''}</text>
      </g>`
    })
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${PALETTE.parchment}"/>
    ${frame(W, H)}
    ${sprig(70, 200, 1.1, PALETTE.moss)} ${sprig(W - 70, 200, 1.1, PALETTE.moss)}
    <text x="${W / 2}" y="80" text-anchor="middle" font-family="'IM Fell English', Georgia, serif" font-size="22" letter-spacing="5" fill="${
      PALETTE.slate
    }">WHISKY ATLAS</text>
    <text x="${W / 2}" y="140" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="40" fill="${
      PALETTE.oak
    }">${esc(menu.name)}</text>
    <text x="${W / 2}" y="175" text-anchor="middle" font-family="Georgia, serif" font-size="17" fill="${
      PALETTE.slate
    }">${esc(menu.description || '')}</text>
    <line x1="120" y1="205" x2="${W - 120}" y2="205" stroke="${PALETTE.moss}" stroke-width="1"/>
    ${rows}
    <text x="${W / 2}" y="${H - 30}" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="${
    PALETTE.slate
  }">Powered by WHISKY ATLAS · ${items.length} 瓶</text>
  </svg>`
  return svgToDataUri(svg)
}

const LOGO_STYLE_CFG = {
  engraving: { shape: 'oval', wax: false },
  watercolor: { shape: 'sheet', wax: false },
  wax_seal: { shape: 'circle', wax: true }
}

// 生成酒单 Logo 图片（data URI）
export function generateLogoImage(name = 'WHISKY', style = 'engraving', seed = 0) {
  const S = 400
  const cfg = LOGO_STYLE_CFG[style] || LOGO_STYLE_CFG.engraving
  const initial = (name.trim()[0] || 'W').toUpperCase()
  const rot = (seed * 23) % 30
  let shape = ''
  if (cfg.shape === 'oval') {
    shape = `<ellipse cx="200" cy="200" rx="150" ry="115" fill="none" stroke="${PALETTE.oak}" stroke-width="3"/>
      <ellipse cx="200" cy="200" rx="140" ry="105" fill="none" stroke="${PALETTE.amber}" stroke-width="1"/>`
  } else if (cfg.shape === 'circle') {
    shape = `<circle cx="200" cy="200" r="130" fill="${cfg.wax ? '#7c2f2f' : 'none'}" stroke="${PALETTE.oak}" stroke-width="3"/>
      <circle cx="200" cy="200" r="118" fill="none" stroke="${cfg.wax ? '#e7c97f' : PALETTE.amber}" stroke-width="1" stroke-dasharray="4 4"/>`
  } else {
    shape = `<rect x="60" y="70" width="280" height="260" fill="#fbf6e7" stroke="${PALETTE.dryflower}" stroke-width="2" stroke-dasharray="6 5"/>`
  }
  const txtColor = cfg.wax ? '#f0dca8' : PALETTE.oak
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${PALETTE.parchment}"/>
    <g transform="rotate(${rot} 200 200)">${shape}</g>
    ${sprig(120, 300, 1.0, cfg.wax ? '#c9a25a' : PALETTE.moss)}
    ${sprig(280, 300, 1.0, cfg.wax ? '#c9a25a' : PALETTE.moss)}
    <text x="200" y="190" text-anchor="middle" font-family="'IM Fell English', Georgia, serif" font-size="${
      cfg.wax ? 110 : 96
    }" fill="${txtColor}">${esc(initial)}</text>
    <text x="200" y="240" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="${txtColor}">${esc(
    name.slice(0, 16)
  )}</text>
  </svg>`
  return svgToDataUri(svg)
}
