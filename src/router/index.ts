import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/profiles',
      name: '作品集',
      component: () => import('../views/lottery/index.vue')
    }
  ]
})

export default router
