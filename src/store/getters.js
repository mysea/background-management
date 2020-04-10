const getters = {
  userInfo: state => state.user.userInfo,
  activeIndex: state => state.app.sidebar.activeIndex,
  navActiveIndex: state => state.app.navbar.activeIndex,
  website: state => state.app.website,
  // 路由
  asyncRouter: state => state.permission.asyncRouter,
  backgroundRouter: state => state.permission.backgroundRouter,
  collaborativeRouter: state => state.permission.collaborativeRouter,
  // 权限
  websites: state => state.user.websites,
  background: state => state.user.background
}

export default getters
