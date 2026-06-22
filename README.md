# WHISKY ALCHEMY · 威士忌炼金术

> v0.3 · **先锋酸性设计（Acid Design）** — 把液态的酒炼成固态的图鉴。

输入酒款关键字 → 抓取数据 → AI 提炼风味 → 选模板 → 生成先锋酸性风格品鉴图鉴卡。

这是基于 [PRD v0.3](#) 实现的移动端 Web 前端原型。所有页面、酸性视觉语言、
卡牌翻转交互、Dark Ambient BGM 均已落地，使用内置酒款知识库 mock 数据，
**离线即可完整运行**（无需 豆包 / Seedream API 密钥）。

## 技术栈

- **Vue 3** + **Vue Router**（Hash 路由，SPA）
- **Vite 5** 构建
- **Tailwind CSS 3** + 自定义酸性设计系统（`src/styles/acid.css`）
- **Web Audio API** 程序化合成 Dark Ambient BGM

## 设计系统（PRD §2）

| 角色 | 色值 |
|------|------|
| 深渊黑 | `#0A0A0A` |
| 液态铬金 | `#C9A84C → #F5D78E → #8B6914` |
| 酸性青光 | `#00FFD1` |
| 腐蚀紫 | `#8B5CF6` |

字体：Space Grotesk（标题）/ JetBrains Mono（数据）/ Inter（正文）。
硬边切割（圆角 2–4px）、3D 深度阴影、霓光辉光、液态光带扫过、金属拉丝纹理。

## 页面（6 页）

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | HomeView | 炼金入口：品牌标题 / 搜索 / 热门酒款 3D 卡 / 最近生成 |
| `/cabinet` | CabinetView | THE VAULT 暗黑金属酒窖，分层陈列舱 |
| `/confirm/:id` | ConfirmView | 数据面板 + 风味频谱 + 置信度进度条 |
| `/template/:id` | TemplateView | 3D 旋转模板预览 + 感受输入（4 套模板） |
| `/result/:id` | ResultView | 炼金动画 → 图鉴卡翻转 ×2 → 全屏放大 → 保存/分享 |
| `/collection` | CollectionView | 酸性网格画廊（localStorage 持久化） |

4 套模板：Acid Chrome / Void Black / Neon Spectrum / Liquid Metal。

## 开发

```bash
pnpm install
pnpm dev        # 开发服务器
pnpm build      # 生产构建
pnpm preview    # 预览构建产物
```

## 与生产环境的差异

本原型用纯 CSS/DOM 程序化渲染品鉴卡（`TastingCard.vue`）作为「炼金产物」保底视觉。
生产环境中该步骤由后端 `POST /api/generate-card` 调用 **豆包 Seedream 5.0** 出图，
数据采集 / 风味提炼由 `POST /api/search`、`POST /api/extract-flavors` 提供（见 PRD §5.3）。
