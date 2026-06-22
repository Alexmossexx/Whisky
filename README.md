# WHISKY ATLAS — 威士忌电子酒单 (v1.1)

> 每一瓶威士忌，都是土地写给人的一封植物信

复古植物图谱风格的威士忌品鉴图鉴 + 电子酒单生成器。基于 PRD v1.1 实现的移动端 Web 应用。

## ✨ 特性

- **复古植物图谱 UI**：羊皮纸底纹、铜版画线框、标本标签、火漆蜡封、植物插画装饰、水彩晕开/琥珀沉淀等动效
- **图鉴 / 酒单双引擎**（同级功能）：每个用户都能生成品鉴卡、整理酒单、分享推荐
- **三条生成路径**：综合推荐 / 定制化（选模板+写感受）/ 随机抽卡
- **5 套品鉴卡模板**：二次元和风 / 极简墨色 / 社交竖版 / 清新水彩 / **复古植物图谱**
- **AI 生成 Logo**：3 种风格（铜版画徽章 / 水彩标本 / 蜡封徽章），每次 3 个候选
- **电子酒单**：创建、AI Logo、添加酒款、拖拽排序、上下架、按产区分组、杯卖价
- **分享**：下载长图（发朋友圈）/ 复制链接 / 导出视频 / 小程序码
- **个人设置**：昵称 / 简介 / AI 个人 Logo / 订阅套餐（免费/探索/专业/旗舰）
- **程序化 BGM**：Web Audio API 合成古典吉他/竖琴轻音乐（右上角开关）

## 🛠 技术栈

- Vue 3 + Vue Router + Pinia
- Vant 4 + Tailwind CSS
- Vite 6
- 数据持久化：localStorage

## 🎨 AI 生图说明

PRD 规定品鉴卡与 Logo 由**豆包 Seedream 5.0** 生成。当前沙箱无 Doubao API Key，
故 `src/services/imagegen.js` 用 **SVG 程序化合成**复古植物图谱风格图片作为占位，
`src/services/api.js` 为与真实后端一致的 Mock 服务层。接入真实后端时，
只需把 `api.js` 中各函数替换为对 `/api/...`（PRD 8.3）的网络请求即可。

## 🚀 开发

```bash
pnpm install
pnpm dev      # 启动开发服务器
pnpm build    # 生产构建
pnpm preview  # 预览构建产物
```

## 📁 目录结构

```
src/
├── components/   # TabBar / WaxSeal / AppHeader / BgmToggle
├── views/        # 12 个页面（首页/酒窖/确认/路径/结果/图鉴 + 酒单模块 + 导出/设置）
├── services/     # api.js (Mock 服务层) / imagegen.js (SVG 生图)
├── store/        # Pinia: cards / menus / settings
├── data/         # mock.js (内置知识库/产区/模板)
├── router/       # 路由
└── styles/       # theme.css (复古植物图谱设计系统)
```

## 📄 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 搜索 + 热门 + 最近生成 |
| `/shelf` | 酒窖 | 植物标本柜 · 按产区浏览 |
| `/confirm/:id` | 数据确认 | 标本面板 + 风味摘要 |
| `/path/:id` | 生成路径 | 综合推荐/定制化/随机抽卡 |
| `/result/:cardId` | 生成结果 | 品鉴卡 + 保存/分享/加入酒单/导出 |
| `/mine` | 我的图鉴 | 品鉴卡瀑布流 |
| `/menu` | 酒单首页 | 我的酒单列表 + 创建 |
| `/menu/:id/edit` | 酒单编辑 | 名称/简介/AI Logo/酒款管理 |
| `/menu/:id` | 酒单展示 | 公开分享视图（按产区分组） |
| `/menu/:id/share` | 酒单分享 | 长图/链接/视频/小程序码 |
| `/export` | 导出 | 选卡 + 格式（PNG/GIF/MP4） |
| `/settings` | 个人设置 | 昵称/Logo/订阅 |

---

*v1.1 · 基于 v0.2 功能框架 · UI 升级复古植物图谱 · 图鉴/酒单同级 · AI 生成 Logo · 统一用户身份*
