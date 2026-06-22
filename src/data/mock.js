// 内置威士忌知识库（PRD 6.1 降级保底，8款）+ 热门酒款 + 产区
// 字段对应 PRD 6.2 抓取字段

export const REGIONS = [
  { key: 'islay', label: '艾雷岛', en: 'Islay', plant: '泥煤苔+海藻', latin: 'Sphagnum + Fucus', seal: '#7c2f2f' },
  { key: 'highland', label: '高地', en: 'Highland', plant: '石楠花+松', latin: 'Calluna + Pinus', seal: '#4a6b3a' },
  { key: 'speyside', label: '斯佩塞', en: 'Speyside', plant: '大麦+苹果', latin: 'Hordeum + Malus', seal: '#c4944a' },
  { key: 'islands', label: '岛屿区', en: 'Islands', plant: '海盐+欧石南', latin: 'Erica', seal: '#7b8b6f' },
  { key: 'japan', label: '日本', en: 'Japan', plant: '水楢木+樱花', latin: 'Quercus mongolica + Prunus', seal: '#b8937a' },
  { key: 'lowland', label: '低地', en: 'Lowland', plant: '薰衣草+鸢尾', latin: 'Lavandula + Iris', seal: '#8a7aa0' },
  { key: 'campbeltown', label: '坎贝尔镇', en: 'Campbeltown', plant: '海带+石楠', latin: 'Laminaria + Erica', seal: '#5c6b6f' }
]

export const KNOWLEDGE_BASE = [
  {
    id: 'kb-yoichi-1987',
    whisky_name: 'Yoichi 1987 SMWS 25 Year Old',
    name_cn: '余市1987 SMWS',
    distillery: '余市 Yoichi',
    region: 'japan',
    country: '日本 北海道',
    vintage: 1987,
    bottled: 2012,
    age: 25,
    cask_type: 'Virgin Oak Butt',
    abv: 59.2,
    outturn: 485,
    bottler: 'SMWS',
    score: 88,
    latin: 'Quercus mongolica',
    flavors: {
      nose: ['煮硬糖', '檀香', '太妃糖'],
      palate: ['肉桂糖', '蜂蜜', '香草'],
      finish: ['悠长', '甘甜', '干烟熏']
    },
    confidence: 'high'
  },
  {
    id: 'kb-ardbeg-uige',
    whisky_name: 'Ardbeg Uigeadail',
    name_cn: 'Ardbeg Uigeadail',
    distillery: 'Ardbeg',
    region: 'islay',
    country: '苏格兰 艾雷岛',
    vintage: null,
    bottled: null,
    age: null,
    cask_type: 'Sherry & Bourbon',
    abv: 54.2,
    outturn: null,
    bottler: 'OB',
    score: 91,
    latin: 'Sphagnum + Fucus',
    flavors: {
      nose: ['泥煤烟熏', '海盐', '葡萄干'],
      palate: ['黑巧克力', '雪莉甜', '碘酒'],
      finish: ['悠长', '篝火', '咖啡']
    },
    confidence: 'high'
  },
  {
    id: 'kb-macallan-18',
    whisky_name: 'Macallan 18 Year Old Sherry Oak',
    name_cn: 'Macallan 18年雪莉桶',
    distillery: 'Macallan',
    region: 'speyside',
    country: '苏格兰 斯佩塞',
    vintage: null,
    bottled: null,
    age: 18,
    cask_type: 'Sherry Oak',
    abv: 43,
    outturn: null,
    bottler: 'OB',
    score: 89,
    latin: 'Hordeum + Malus',
    flavors: {
      nose: ['干果', '橙皮', '木质香料'],
      palate: ['雪莉', '生姜', '葡萄干'],
      finish: ['绵长', '橡木', '辛香']
    },
    confidence: 'high'
  },
  {
    id: 'kb-yamazaki-18',
    whisky_name: 'Yamazaki 18 Year Old',
    name_cn: '山崎18年',
    distillery: '山崎 Yamazaki',
    region: 'japan',
    country: '日本',
    vintage: null,
    bottled: null,
    age: 18,
    cask_type: 'Mizunara / Sherry',
    abv: 43,
    outturn: null,
    bottler: 'OB',
    score: 90,
    latin: 'Quercus mongolica',
    flavors: {
      nose: ['熟果', '檀香', '蜂蜜'],
      palate: ['黑莓', '水楢木', '苦巧克力'],
      finish: ['悠长', '香料', '烟熏']
    },
    confidence: 'high'
  },
  {
    id: 'kb-lagavulin-16',
    whisky_name: 'Lagavulin 16 Year Old',
    name_cn: 'Lagavulin 16年',
    distillery: 'Lagavulin',
    region: 'islay',
    country: '苏格兰 艾雷岛',
    vintage: null,
    bottled: null,
    age: 16,
    cask_type: 'Ex-Bourbon',
    abv: 43,
    outturn: null,
    bottler: 'OB',
    score: 90,
    latin: 'Sphagnum + Fucus',
    flavors: {
      nose: ['浓郁泥煤', '海风', '香草'],
      palate: ['烟熏', '海盐', '甜橡木'],
      finish: ['极悠长', '泥煤', '干果']
    },
    confidence: 'high'
  },
  {
    id: 'kb-glenfiddich-12',
    whisky_name: 'Glenfiddich 12 Year Old',
    name_cn: 'Glenfiddich 12年',
    distillery: 'Glenfiddich',
    region: 'speyside',
    country: '苏格兰 斯佩塞',
    vintage: null,
    bottled: null,
    age: 12,
    cask_type: 'Bourbon & Sherry',
    abv: 40,
    outturn: null,
    bottler: 'OB',
    score: 84,
    latin: 'Hordeum + Malus',
    flavors: {
      nose: ['青苹果', '梨', '奶油'],
      palate: ['花香', '橡木', '香草'],
      finish: ['清爽', '柔和', '麦芽']
    },
    confidence: 'medium'
  },
  {
    id: 'kb-talisker-10',
    whisky_name: 'Talisker 10 Year Old',
    name_cn: 'Talisker 10年',
    distillery: 'Talisker',
    region: 'islands',
    country: '苏格兰 斯凯岛',
    vintage: null,
    bottled: null,
    age: 10,
    cask_type: 'Ex-Bourbon',
    abv: 45.8,
    outturn: null,
    bottler: 'OB',
    score: 87,
    latin: 'Erica',
    flavors: {
      nose: ['海盐', '烟熏', '柑橘'],
      palate: ['黑胡椒', '海风', '麦芽'],
      finish: ['辛辣', '温暖', '烟熏']
    },
    confidence: 'high'
  },
  {
    id: 'kb-springbank-15',
    whisky_name: 'Springbank 15 Year Old',
    name_cn: 'Springbank 15年',
    distillery: 'Springbank',
    region: 'campbeltown',
    country: '苏格兰 坎贝尔镇',
    vintage: null,
    bottled: null,
    age: 15,
    cask_type: 'Sherry',
    abv: 46,
    outturn: null,
    bottler: 'OB',
    score: 88,
    latin: 'Laminaria + Erica',
    flavors: {
      nose: ['雪莉', '咸味', '皮革'],
      palate: ['太妃糖', '干果', '海盐'],
      finish: ['油润', '悠长', '微烟熏']
    },
    confidence: 'medium'
  }
]

// 首页热门酒款
export const HOT_WHISKIES = ['kb-yamazaki-18', 'kb-ardbeg-uige', 'kb-macallan-18', 'kb-lagavulin-16']

export const TEMPLATES = [
  { key: 'ghibli', label: '二次元和风', desc: '吉卜力风景+浮世绘线条', scene: '日威/亚洲威士忌' },
  { key: 'ink', label: '极简墨色', desc: '黑底金字，极简排版', scene: '苏威/老酒/收藏级' },
  { key: 'social', label: '社交竖版', desc: '9:16大字报，风味词突出', scene: '小红书/朋友圈直发' },
  { key: 'watercolor', label: '清新水彩', desc: '水彩手绘风', scene: '轻松分享/日常记录' },
  { key: 'botanical', label: '复古植物图谱', desc: '柯蒂斯铜版画风+拉丁学名', scene: '高端展示/酒单/品牌感', isNew: true }
]

export const LOGO_STYLES = [
  { key: 'engraving', label: '铜版画徽章', desc: '椭圆形+植物环绕+复古字体' },
  { key: 'watercolor', label: '水彩标本', desc: '植物水彩画+手写标签' },
  { key: 'wax_seal', label: '蜡封徽章', desc: '圆形火漆印章+首字母+植物点缀' }
]

export function regionOf(key) {
  return REGIONS.find((r) => r.key === key) || REGIONS[0]
}
