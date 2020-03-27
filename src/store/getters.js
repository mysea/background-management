const getters = {
  activeIndex: state => state.app.sidebar.activeIndex,
  navActiveIndex: state => state.app.navbar.activeIndex,
  website: state => state.app.website,
  // 路由
  filterRouter: state => state.permission.filterRouter,
  backgroundRouter: state => state.permission.backgroundRouter,
  // 权限
  allAuth: state => state.user.allAuth,
  background: state => state.user.background
}

export default getters
