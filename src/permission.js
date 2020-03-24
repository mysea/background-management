import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { getAuth } from '@/utils/auth'

let loadAsyncRouter = false
const whiteList = ['/login']
// 有token
//    /login，回到首页
//    是不是第一次进来
//        第一次进来
//            store中有没有auth
//                有，登录页登录时已获取权限，生成动态路由
//                无，刷新页面导致，重新请求权限接口，生成动态路由
//        不是，过
// 没有token
//    在白名单，过
//    重定向到login页
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getAuth()) {
    if (to.path === 'login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!loadAsyncRouter) {
        loadAsyncRouter = true
        if (store.getters.allAuth) {
          store.dispatch('generateRouter', store.getters.allAuth).then(() => {
            router.addRoutes(store.getters.filterRouter)
            if (to.path === '404') {
              next({
                path: to.redirectedFrom || '/',
                replace: true
              })
            } else {
              next({
                ...to,
                replace: true
              })
            }
          })
        } else {
          store.dispatch('getAuth').then(allAuth => {
            store.dispatch('generateRouter', allAuth).then(() => {
              router.addRoutes(store.getters.filterRouter)
              if (to.path === '/404') {
                next({
                  path: to.redirectedFrom || '/',
                  replace: true
                })
              } else {
                next({
                  ...to,
                  replace: true
                })
              }
            })
          })
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
