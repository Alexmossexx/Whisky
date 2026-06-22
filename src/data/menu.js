// HERBARIUM — 电子酒单数据 (PRD v0.4)
// 植物元素目录 + 产区映射 + 风格模板 + 商家酒单

// 植物元素：key → { cn, latin, kind(用于选择 SVG 插画) }
export const plants = {
  barley: { cn: '大麦', latin: 'Hordeum vulgare', kind: 'barley' },
  oakUS: { cn: '美洲白橡', latin: 'Quercus alba', kind: 'oak' },
  oakEU: { cn: '欧洲橡木', latin: 'Quercus robur', kind: 'oak' },
  oakJP: { cn: '水楢木', latin: 'Quercus mongolica', kind: 'oak' },
  heather: { cn: '石楠花', latin: 'Calluna vulgaris', kind: 'heather' },
  erica: { cn: '欧石南', latin: 'Erica cinerea', kind: 'heather' },
  peat: { cn: '泥煤苔', latin: 'Sphagnum', kind: 'moss' },
  seaweed: { cn: '海藻', latin: 'Fucus vesiculosus', kind: 'seaweed' },
  pine: { cn: '苏格兰松', latin: 'Pinus sylvestris', kind: 'pine' },
  apple: { cn: '苹果', latin: 'Malus domestica', kind: 'apple' },
  sakura: { cn: '樱花', latin: 'Prunus serrulata', kind: 'sakura' }
}

// 产区 → 默认植物元素 (PRD §5.1)
export const regionPlants = {
  Islay: ['peat', 'seaweed'],
  Highland: ['heather', 'pine'],
  Speyside: ['barley', 'apple'],
  Islands: ['erica', 'seaweed'],
  Japan: ['oakJP', 'sakura']
}

// 风格模板：植物组合 + 配色 + 动效 (PRD §5.3)
export const templates = [
  {
    id: 'curtis',
    name: 'Curtis',
    cn: '柯蒂斯铜版画',
    desc: '19世纪植物学杂志 · 精细线条手绘上色',
    accent: '#4A6B3A',
    paper: '#F5EDD6'
  },
  {
    id: 'herbarium',
    name: 'Herbarium',
    cn: '标本馆',
    desc: '压制标本 + 鉴定标签 + 虚线边框',
    accent: '#7B8B6F',
    paper: '#EFE7D2'
  },
  {
    id: 'honzo',
    name: 'Honzō',
    cn: '本草图谱',
    desc: '东方植物图鉴 · 朱印 · 留白',
    accent: '#8C3B2E',
    paper: '#F3ECDA'
  },
  {
    id: 'merian',
    name: 'Merian',
    cn: '梅里安手稿',
    desc: '博物学家手稿 · 暖金上色 · 解剖细节',
    accent: '#C4944A',
    paper: '#F4E9CC'
  }
]

export function plantsFor(region, override) {
  if (override && override.length) return override
  return regionPlants[region] || ['barley', 'oakUS']
}

// 商家信息
export const bar = {
  name: 'THE FERN & CASK',
  cn: '蕨与桶 · 威士忌吧',
  city: '北京 · 鼓楼',
  code: 'WB-7791'
}

// 酒单库存（每瓶 = 一幅植物图鉴）
export const inventory = [
  {
    id: 'yamazaki-18',
    name: 'Yamazaki 18',
    cn: '山崎 18 年',
    region: 'Japan',
    cask: '水楢桶',
    age: '18',
    abv: '43.0',
    cup: 180,
    bottle: 4200,
    plants: ['oakJP', 'sakura'],
    template: 'honzo',
    available: true,
    flavor: { nose: ['白桃', '檀香'], palate: ['椰子', '水楢木'], finish: ['和谐', '清雅'] },
    note: '东方水楢木的禅意，伽罗与蜜桃在舌尖结成一座庭院。'
  },
  {
    id: 'yoichi-1987',
    name: 'Yoichi 1987 SMWS',
    cn: '余市 1987',
    region: 'Japan',
    cask: 'Virgin Oak',
    age: '25',
    abv: '59.2',
    cup: 220,
    bottle: 6800,
    plants: ['barley', 'oakJP'],
    template: 'merian',
    available: true,
    flavor: { nose: ['檀香', '太妃糖'], palate: ['肉桂', '蜂蜜'], finish: ['悠长', '烟熏'] },
    note: '北国大麦在新桶中沉淀廿五载，入口冲击，回甘悠长。'
  },
  {
    id: 'macallan-18',
    name: 'Macallan 18',
    cn: '麦卡伦 18 雪莉',
    region: 'Speyside',
    cask: '欧洲橡木雪莉桶',
    age: '18',
    abv: '43.0',
    cup: 200,
    bottle: 5600,
    plants: ['oakEU', 'barley'],
    template: 'curtis',
    available: true,
    flavor: { nose: ['干果', '橙皮'], palate: ['雪莉', '黑巧'], finish: ['丝滑', '绵长'] },
    note: '欧洲橡木的骨架托起雪莉的奢华，斯佩塞河谷的液态黄金。'
  },
  {
    id: 'ardbeg-10',
    name: 'Ardbeg 10',
    cn: '阿贝 10 年',
    region: 'Islay',
    cask: 'Bourbon',
    age: '10',
    abv: '46.0',
    cup: 160,
    bottle: 1280,
    plants: ['peat', 'seaweed'],
    template: 'herbarium',
    available: true,
    flavor: { nose: ['泥煤', '碘酒'], palate: ['烟熏', '海盐'], finish: ['炙烤', '极长'] },
    note: '艾雷岛的泥煤苔与海藻，一头沉睡在橡木桶里的工业怪兽。'
  },
  {
    id: 'talisker-10',
    name: 'Talisker 10',
    cn: '泰斯卡 10 年',
    region: 'Islands',
    cask: 'Refill',
    age: '10',
    abv: '45.8',
    cup: 150,
    bottle: 980,
    plants: ['erica', 'seaweed'],
    template: 'curtis',
    available: true,
    flavor: { nose: ['海风', '黑胡椒'], palate: ['海盐', '麦芽'], finish: ['胡椒', '海浪'] },
    note: '天空岛的欧石南在咸鲜海雾里绽放，胡椒在喉间炸开。'
  },
  {
    id: 'highland-park-12',
    name: 'Highland Park 12',
    cn: '高原骑士 12',
    region: 'Highland',
    cask: 'Sherry',
    age: '12',
    abv: '40.0',
    cup: 120,
    bottle: 760,
    plants: ['heather', 'pine'],
    template: 'merian',
    available: true,
    flavor: { nose: ['石楠蜜', '烟熏'], palate: ['麦芽', '香料'], finish: ['花香', '温暖'] },
    note: '奥克尼的石楠花蜜与松针，把高地的风焙进了酒里。'
  },
  {
    id: 'laphroaig-10',
    name: 'Laphroaig 10',
    cn: '拉弗格 10 年',
    region: 'Islay',
    cask: 'Bourbon',
    age: '10',
    abv: '40.0',
    cup: 140,
    bottle: 880,
    plants: ['peat', 'seaweed'],
    template: 'herbarium',
    available: false,
    flavor: { nose: ['消毒水', '海藻'], palate: ['烟熏', '咸味'], finish: ['药感', '灰烬'] },
    note: '爱者极爱，恨者极恨——泥煤苔写就的一封重口味情书。'
  },
  {
    id: 'oban-14',
    name: 'Oban 14',
    cn: '欧本 14 年',
    region: 'Highland',
    cask: 'Oak',
    age: '14',
    abv: '43.0',
    cup: 130,
    bottle: 920,
    plants: ['heather', 'apple'],
    template: 'curtis',
    available: false,
    flavor: { nose: ['橙子', '海盐'], palate: ['麦芽', '柑橘'], finish: ['干爽', '微咸'] },
    note: '西高地的石楠与苹果，温和却藏着海岸线的低语。'
  }
]
