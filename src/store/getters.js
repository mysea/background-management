const getters = {
  activeIndex: state => state.app.sidebar.activeIndex,
  navActiveIndex: state => state.app.navbar.activeIndex,
  websiteId: state => state.app.websiteId,
  // 路由
  filterRouter: state => state.permission.filterRouter,
  backgroundRouter: state => state.permission.backgroundRouter,
  // 权限
  allAuth: state => state.user.allAuth,
  background: state => state.user.background
}

export default getters
