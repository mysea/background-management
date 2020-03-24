import { asyncRouter } from '@/router'

function checkAuth (router, auth) {
  if (router.meta) {
    const meta = router.meta
    if (!meta.requiresAuth) {
      return true
    } else {
      if (meta.index === 0) {
        return auth[meta.type]
      } else if (meta.index === 1) {
        return auth[meta.type] ? auth[meta.type][router.name].indexOf('read') !== -1 : false
      }
    }
  }
  return true
}

const filterAsyncRouter = function (routers, authInfo) {
  const res = []
  routers.map(item => {
    const tmp = {
      ...item
    }
    // console.log('tmp: ', tmp)
    // console.log('result: ', checkAuth(tmp, authInfo))
    if (checkAuth(tmp, authInfo)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, authInfo)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    filterRouter: [],
    backgroundRouter: {
      name: 'background',
      children: []
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.filterRouter = routers
      routers.map(item => {
        if (item.name === 'background') {
          state.backgroundRouter = item
        }
      })
    }
  },
  actions: {
    generateRouter ({ commit }, data) {
      return new Promise(resolve => {
        // 根据权限过滤后的路由
        // console.log('asyncRouter: ', asyncRouter)
        // const tempRouters = filterAsyncRouter(asyncRouter, data)
        const tempRouters = asyncRouter
        let redirect = ''
        // 设置子系统的重定向，默认每个项目的重定向是第一个子项
        tempRouters.map(item => {
          if (item.children && item.children.length > 0) {
            item.redirect = item.path + '/' + item.children[0].path
          }
          if (item.redirect && !redirect) { // 默认设置/的重定向为第一个子系统的重定向
            redirect = item.redirect
          }
        })
        // 设置根目录的重定向，默认跳转到第一个项目的第一个子项
        if (redirect) {
          tempRouters.push({
            path: '/',
            redirect: redirect,
            hidden: true
          })
        }
        commit('SET_ROUTERS', tempRouters)
        resolve(tempRouters)
      })
    }
  }
}

export default permission
