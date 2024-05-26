import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/tools',
      name:'小工具',
      children:[
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
    },
   
  ]
})

export default router
