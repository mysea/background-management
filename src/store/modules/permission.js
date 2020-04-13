const getAsyncRouter = function (websites) {
  const tempList = []
  websites.forEach(website => {
    const tempWebsite = {
      name: website.code,
      path: '/' + website.code,
      component: () => import('@/views' + website.url),
      meta: {
        icon: website.code,
        title: website.name
      },
      children: getChildrenRouter(website.modules)
    }
    // 设置站点的重定向，默认每个站点的重定向是第一个子项
    if (tempWebsite.children[0].path) {
      const redirect = '/' + website.code + '/' + tempWebsite.children[0].path
      tempWebsite.redirect = redirect
    }
    tempList.push(tempWebsite)
  })
  // 设置根路径的重定向，默认跳转到第一个站点的第一个子项
  if (tempList[0] && tempList[0].redirect) {
    tempList.push({
      path: '/',
      redirect: tempList[0].redirect,
      hidden: true
    })
  }
  tempList.push({
    path: '*',
    redirect: '/404',
    hidden: true
  })
  return tempList
}

const getChildrenRouter = function (modules) {
  const tempList = []
  modules.forEach(moduleItem => {
    const tempModule = {
      name: moduleItem.code,
      path: moduleItem.code,
      component: () => import('@/views' + moduleItem.url),
      meta: {
        icon: moduleItem.icon,
        title: moduleItem.name
      },
      children: getChildrenRouter(moduleItem.children)
    }
    // 如果有多级，父项的重定向为第一个子项
    if (tempModule.children.length > 0) {
      const redirect = moduleItem.code + '/' + tempModule.children[0].path
      tempModule.redirect = redirect
    }
    tempList.push(tempModule)
  })
  return tempList
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
        const router = getAsyncRouter(data)
        commit('SET_ROUTERS', router)
        resolve(router)
      })
    }
  }
}

export default permission
