const getAsyncRouter = function (websites) {
  const tempList = []
  websites.forEach(website => {
    tempList.push({
      name: website.code,
      path: '/' + website.code,
      component: () => import('@/views' + website.url),
      meta: {
        icon: website.code,
        title: website.name
      },
      children: getChildrenRouter(website.modules)
    })
  })
  return tempList
}

const getChildrenRouter = function (modules) {
  const tempList = []
  modules.forEach(moduleItem => {
    const children = getChildrenRouter(moduleItem.children)
    tempList.push({
      name: moduleItem.code,
      path: moduleItem.code,
      component: () => import('@/views' + moduleItem.url),
      meta: {
        icon: moduleItem.icon,
        title: moduleItem.name
      },
      children
    })
  })
  return tempList
}

const setRediretRouter = function (modules) {
  const tempRouters = getAsyncRouter(modules)
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
  tempRouters.push({
    path: '*',
    redirect: '/404',
    hidden: true
  })
  return tempRouters
}

const permission = {
  state: {
    asyncRouter: [],
    backgroundRouter: {
      name: 'background',
      children: []
    },
    collaborativeRouter: {
      name: 'collaborative',
      children: []
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.asyncRouter = routers
      routers.map(item => {
        if (item.name === 'background') {
          state.backgroundRouter = item
        } else if (item.name === 'collaborative') {
          state.collaborativeRouter = item
        }
      })
    }
  },
  actions: {
    generateRouter ({ commit }, data) {
      return new Promise(resolve => {
        const router = setRediretRouter(data)
        commit('SET_ROUTERS', router)
        resolve(router)
      })
    }
  }
}

export default permission
