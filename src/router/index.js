import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/cabinet', name: 'cabinet', component: () => import('../views/CabinetView.vue') },
  { path: '/confirm/:id', name: 'confirm', component: () => import('../views/ConfirmView.vue') },
  { path: '/template/:id', name: 'template', component: () => import('../views/TemplateView.vue') },
  { path: '/result/:id', name: 'result', component: () => import('../views/ResultView.vue') },
  { path: '/collection', name: 'collection', component: () => import('../views/CollectionView.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
