import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/lottery',
      name: 'lottery',
      component: () => import('../views/lottery/index.vue')
    },
    {
      path: '/calendar',
      name: '日曆',
      component: () => import('../views/calendar/index.vue')
    }
  ]
})

export default router
