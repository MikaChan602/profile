import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/tools',
      name:'小工具',
      meta: {
        hidden: false,
      },
      children:[
        {
          path: '/lottery',
          name: 'lottery',
          component: () => import('../views/lottery/index.vue'),
          meta: {
            hidden: true,
          },
        
        },
        {
          path: '/calendar',
          name: '日曆',
          component: () => import('../views/calendar/index.vue')
        }
      ]
    },
    {
      path:'/animations',
      name:'動畫',
      children:[
        {
          path: '/buttons',
          name: '按鈕特效',
          component: () => import('../views/animations/buttons.vue')
        },
        {
          path: '/backgrounds',
          name: '背景特效',
          component: () => import('../views/animations/backgrounds.vue')
        },
      ]
    },
    {
      path:'/JSundergroundCastle',
      name:'JS地下城',
      meta: {
        hidden: true,
      },
      // children:[
      //   {
      //     path: '/lottery',
      //     name: 'lottery',
      //     component: () => import('../views/lottery/index.vue')
      //   },
      //   {
      //     path: '/calendar',
      //     name: '日曆',
      //     component: () => import('../views/calendar/index.vue')
      //   }
      // ]      
    }
  ]
})

export default router
