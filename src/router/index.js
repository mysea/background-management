import Vue from 'vue'
import VueRouter from 'vue-router'

import backgroundRouter from './modules/background'

Vue.use(VueRouter)

export const constantRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const asyncRouter = [
  backgroundRouter
]

const router = new VueRouter({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouter
})

export default router
