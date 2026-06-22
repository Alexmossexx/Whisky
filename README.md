# HERBARIUM · 威士忌植物酒单

> v0.4 · **新复古植物图谱**(Vintage Botanical) — 不是金店,不是赛博,是一本 19 世纪植物学家的手稿。

**酒吧老板的可编辑电子酒单。每瓶酒都是一幅复古植物图鉴,客人扫码看会动的菜单,
老板一键导出视频发小红书抖音。**

移动端 Web 交互演示,内置一家 demo 酒吧的酒单,**离线即可完整体验**(无后端依赖)。

## 体验路径(交互演示)

落地页有两扇门:

- **商家后台** `/admin` — 管理酒柜:添加 / 编辑 / 上下架(开关)/ 拖动排序(▲▼)/
  换风格 / 导出 / 查看酒单链接 + 小程序码
- **扫码看酒单** `/menu` — 客人视角:按产区分组的植物图鉴菜单 → 点酒款进全屏图鉴
  (`/plate/:id`:铜版画植物牌 + 品鉴笔记 + 风味轮 + 拉丁学名标注)

生成图鉴三条路径(`/admin/generate/:id`):**综合推荐 / 定制化 / 随机抽卡**。
导出(`/admin/export/:id`):静态 PNG / 动态 GIF / 视频 MP4(模拟 FFmpeg 合成进度)。

## 设计系统(PRD v0.4 §2)

| 角色 | 色值 |
|------|------|
| 羊皮纸底 | `#F5EDD6` |
| 深橡木棕 | `#5C3D2E` |
| 苔藓绿 | `#4A6B3A` |
| 琥珀金 | `#C4944A` |
| 石板灰 / 干花色 / 墨水黑 | `#7B8B6F` / `#B8937A` / `#2C2416` |

字体 Cormorant Garamond / EB Garamond / IM Fell English / Noto Serif SC。
羊皮纸纹理、铜版画线框、火漆印章、标本标签、手写拉丁学名、植物 SVG 插画
(`PlantArt.vue`:大麦 / 橡木 / 石楠 / 泥煤苔 / 海藻 / 松 / 苹果 / 樱花)。

## 技术栈

Vue 3 + Vue Router(Hash)+ Vite 5 + Tailwind 3。植物图鉴牌(`BotanicalPlate.vue`)
与风味轮均为程序化 SVG 渲染;生产环境对应后端出图 + FFmpeg 视频合成(PRD §5)。

## 开发

```bash
pnpm install
pnpm dev      # 开发
pnpm build    # 构建到 dist/
pnpm preview  # 预览
```

## 部署

GitHub Actions(`.github/workflows/deploy.yml`)构建 `dist/` 发布到 GitHub Pages,
自定义域名 `wszzz.site`(见 `public/CNAME`)。
