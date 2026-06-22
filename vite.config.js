import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// WHISKY ALCHEMY — mobile web, client-rendered SPA
export default defineConfig({
  // 相对路径：同时兼容 GitHub Pages 项目站(/whisky/)与自定义域名根目录(/)
  // 配合 hash 路由，无需服务端 rewrite
  base: './',
  plugins: [vue()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    cssCodeSplit: false // 避免首页空白 Bug（见 PRD v0.2）
  }
})
