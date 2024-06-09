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
          name: '抽獎',
          component: () => import('../views/lottery/index.vue'),
          meta: {
            hidden: false,
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
      meta: {
        hidden: true,
      },
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
      path:'/undergroundCastle',
      name:'JS地下城',
      meta: {
        hidden: false,
      },
      children:[
        {
          path: '/groundFloor',
          name: '第一層',
          component: () => import('../views/undergroundCastle/groundFloor.vue')
        },
        {
          path: '/firstFloor',
          name: '第二層',
          component: () => import('../views/undergroundCastle/firstFloor.vue'),
          meta: {
            hidden: true,
          },
        },
        {
          path: '/secondFloor',
          name: '第三層',
          component: () => import('../views/undergroundCastle/secondFloor.vue'),
          meta: {
            hidden: true,
          },
        },
      ]      
    }
  ]
})

export default router
