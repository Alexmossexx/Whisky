// 内置酒款知识库（PRD §4.4 降级保底 + mock）
// 每个酒款含抓取字段 + LLM 提炼后的风味关键词

export const whiskies = [
  {
    id: 'yoichi-1987-smws',
    name: 'Yoichi 1987 SMWS',
    cn: '余市 1987 SMWS',
    distillery: 'Yoichi',
    region: 'Hokkaido',
    age: '25yr',
    abv: '59.2%',
    cask: 'Virgin Oak',
    score: 87,
    accent: '#00FFD1',
    confidence: 0.85,
    level: 'high',
    flavor: {
      nose: ['檀香', '太妃糖', '硬糖'],
      palate: ['肉桂', '蜂蜜', '香草'],
      finish: ['悠长', '甘甜', '烟熏']
    },
    note: '入口冲击，回甘悠长，一口泥煤与海风的对撞。'
  },
  {
    id: 'macallan-18',
    name: 'Macallan 18 Sherry Oak',
    cn: '麦卡伦 18 雪莉桶',
    distillery: 'Macallan',
    region: 'Speyside',
    age: '18yr',
    abv: '43.0%',
    cask: 'Sherry Oak',
    score: 92,
    accent: '#C9A84C',
    confidence: 0.92,
    level: 'high',
    flavor: {
      nose: ['干果', '橙皮', '木质'],
      palate: ['雪莉', '姜', '黑巧'],
      finish: ['丝滑', '辛香', '绵长']
    },
    note: '雪莉的奢华与橡木的骨架，液态黄金的标准答案。'
  },
  {
    id: 'ardbeg-10',
    name: 'Ardbeg 10',
    cn: '阿贝 10 年',
    distillery: 'Ardbeg',
    region: 'Islay',
    age: '10yr',
    abv: '46.0%',
    cask: 'Bourbon',
    score: 91,
    accent: '#8B5CF6',
    confidence: 0.88,
    level: 'high',
    flavor: {
      nose: ['泥煤', '碘酒', '柑橘'],
      palate: ['烟熏', '海盐', '黑胡椒'],
      finish: ['炙烤', '焦油', '极长']
    },
    note: '泥煤怪兽，工业暗黑美学的液体化身。'
  },
  {
    id: 'yamazaki-12',
    name: 'Yamazaki 12',
    cn: '山崎 12 年',
    distillery: 'Yamazaki',
    region: 'Osaka',
    age: '12yr',
    abv: '43.0%',
    cask: 'Mizunara',
    score: 89,
    accent: '#00FFD1',
    confidence: 0.9,
    level: 'high',
    flavor: {
      nose: ['白桃', '蜂蜜', '檀香'],
      palate: ['椰子', '蔓越莓', '水楢木'],
      finish: ['和谐', '微辛', '清雅']
    },
    note: '东方水楢木的禅意，潮流款的社交货币。'
  },
  {
    id: 'laphroaig-10',
    name: 'Laphroaig 10',
    cn: '拉弗格 10 年',
    distillery: 'Laphroaig',
    region: 'Islay',
    age: '10yr',
    abv: '40.0%',
    cask: 'Bourbon',
    score: 86,
    accent: '#8B5CF6',
    confidence: 0.83,
    level: 'high',
    flavor: {
      nose: ['消毒水', '海藻', '泥煤'],
      palate: ['烟熏', '香草', '咸味'],
      finish: ['药感', '灰烬', '悠长']
    },
    note: '爱者极爱，恨者极恨——重口味泥煤的图腾。'
  },
  {
    id: 'talisker-10',
    name: 'Talisker 10',
    cn: '泰斯卡 10 年',
    distillery: 'Talisker',
    region: 'Skye',
    age: '10yr',
    abv: '45.8%',
    cask: 'Refill',
    score: 88,
    accent: '#00FFD1',
    confidence: 0.86,
    level: 'high',
    flavor: {
      nose: ['海风', '黑胡椒', '烟熏'],
      palate: ['海盐', '麦芽', '辛辣'],
      finish: ['胡椒', '温暖', '海浪']
    },
    note: '天空岛的咸鲜与胡椒爆裂，海洋的工业脉冲。'
  },
  {
    id: 'oban-14',
    name: 'Oban 14',
    cn: '欧本 14 年',
    distillery: 'Oban',
    region: 'Highland',
    age: '14yr',
    abv: '43.0%',
    cask: 'Oak',
    score: 84,
    accent: '#C9A84C',
    confidence: 0.78,
    level: 'medium',
    flavor: {
      nose: ['橙子', '海盐', '蜂蜜'],
      palate: ['麦芽', '柑橘', '微烟'],
      finish: ['干爽', '微咸', '中长']
    },
    note: '西高地的平衡之作，温和却有海岸的低语。'
  },
  {
    id: 'hibiki-harmony',
    name: 'Hibiki Harmony',
    cn: '响 和风醇韵',
    distillery: 'Suntory',
    region: 'Japan',
    age: 'NAS',
    abv: '43.0%',
    cask: 'Multi',
    score: 85,
    accent: '#C9A84C',
    confidence: 0.8,
    level: 'medium',
    flavor: {
      nose: ['玫瑰', '荔枝', '迷迭香'],
      palate: ['蜂蜜', '橙子', '白巧'],
      finish: ['水楢木', '柔顺', '余韵']
    },
    note: '24面体瓶身的和谐，调和威士忌的美学巅峰。'
  }
]

export function findWhisky(id) {
  return whiskies.find((w) => w.id === id) || whiskies[0]
}

export const templates = [
  {
    id: 'acid-chrome',
    name: 'ACID CHROME',
    cn: '酸性铬金',
    desc: '液态金属 + 铬金渐变 + 3D深度',
    scene: '旗舰模板 · 所有酒款',
    bg: 'linear-gradient(135deg, #1a1a1a, #0d0d0d 60%, #1a1a1a)',
    accent: '#C9A84C'
  },
  {
    id: 'void-black',
    name: 'VOID BLACK',
    cn: '深渊墨色',
    desc: '纯黑 + 微光数据 + 极简排版',
    scene: '苏威 · 收藏级 · 老酒',
    bg: 'linear-gradient(180deg, #000, #0a0a0a)',
    accent: '#F5D78E'
  },
  {
    id: 'neon-spectrum',
    name: 'NEON SPECTRUM',
    cn: '霓虹光谱',
    desc: '酸性青光 + 腐蚀紫 + 频谱可视化',
    scene: '日威 · 潮流款 · 社交分享',
    bg: 'linear-gradient(135deg, #0a0a0a, #1a0a2a)',
    accent: '#00FFD1'
  },
  {
    id: 'liquid-metal',
    name: 'LIQUID METAL',
    cn: '液态金属',
    desc: '汞/银流体 + 3D反射 + 工业感',
    scene: '泥煤 · 重口味 · 男性向',
    bg: 'linear-gradient(135deg, #1a1a1f, #2a2a30, #0d0d10)',
    accent: '#8B5CF6'
  }
]
