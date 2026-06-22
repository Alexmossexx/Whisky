import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/shelf', name: 'shelf', component: () => import('../views/ShelfView.vue') },
  { path: '/confirm/:id', name: 'confirm', component: () => import('../views/ConfirmView.vue') },
  { path: '/path/:id', name: 'path', component: () => import('../views/PathView.vue') },
  { path: '/result/:cardId', name: 'result', component: () => import('../views/ResultView.vue') },
  { path: '/mine', name: 'mine', component: () => import('../views/MineView.vue') },

  // 电子酒单模块（与图鉴同级）
  { path: '/menu', name: 'menu', component: () => import('../views/MenuHomeView.vue') },
  { path: '/menu/:id/edit', name: 'menu-edit', component: () => import('../views/MenuEditView.vue') },
  { path: '/menu/:id', name: 'menu-public', component: () => import('../views/MenuPublicView.vue') },
  { path: '/menu/:id/share', name: 'menu-share', component: () => import('../views/MenuShareView.vue') },

  { path: '/export', name: 'export', component: () => import('../views/ExportView.vue') },
  { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
