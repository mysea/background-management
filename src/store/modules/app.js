const app = {
  state: {
    sidebar: {
      activeIndex: ''
    },
    navbar: {
      activeIndex: ''
    }
  },
  mutations: {
    SET_ACTIVE_INDEX: (state, path) => {
      state.sidebar.activeIndex = path
    },
    SET_NAV_ACTIVE_INDEX: (state, path) => {
      state.navbar.activeIndex = path
    }
  }
}

export default app
