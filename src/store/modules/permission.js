import { asyncRouter } from '@/router'

const filterModules = function (websites) {
  let modules = []
  for (let i = 0; i < websites.length; i++) {
    const website = websites[i]
    if (website.id === 'acb7033c-dd90-4486-887e-1c36d6365c25') {
      modules = website.common_Modules.map(moduleItem => {
        const privileges = moduleItem.common_Privileges.map(privilege => {
          return privilege.type
        })
        return {
          id: moduleItem.id,
          name: moduleItem.name,
          code: moduleItem.code,
          url: moduleItem.url,
          is_auto_expand: moduleItem.is_auto_expand,
          privileges
        }
      })
    }
  }
  return modules
}

const _import = file => require('@/views/background/' + file + '/index')

const filterAsyncRouter = function (modules) {
  const router = modules.map(item => {
    return {
      name: item.code,
      path: `/${item.code}`,
      component: _import(item.code),
      meta: {
        icon: item.code,
        title: item.name
      }
    }
  })
  asyncRouter[0].children = router
  return asyncRouter
}

const setRediretRouter = function (modules) {
  // const tempRouters = filterAsyncRouter(modules)
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
  return tempRouters
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
        const modules = filterModules(data)
        const router = setRediretRouter(modules)
        commit('SET_ROUTERS', router)
        resolve(router)
      })
    }
  }
}

export default permission
