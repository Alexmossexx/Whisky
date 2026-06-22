import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },
  { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
  { path: '/admin/edit/:id', name: 'edit', component: () => import('../views/EditView.vue') },
  { path: '/admin/generate/:id', name: 'generate', component: () => import('../views/GenerateView.vue') },
  { path: '/admin/export/:id', name: 'export', component: () => import('../views/ExportView.vue') },
  { path: '/menu', name: 'menu', component: () => import('../views/MenuView.vue') },
  { path: '/plate/:id', name: 'plate', component: () => import('../views/PlateView.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
