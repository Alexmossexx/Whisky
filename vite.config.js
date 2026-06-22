import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// WHISKY ALCHEMY — mobile web, client-rendered SPA
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    cssCodeSplit: false // 避免首页空白 Bug（见 PRD v0.2）
  }
})
