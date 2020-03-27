const app = {
  state: {
    sidebar: {
      activeIndex: ''
    },
    navbar: {
      activeIndex: ''
    },
    websiteId: ''
  },
  mutations: {
    SET_ACTIVE_INDEX: (state, path) => {
      state.sidebar.activeIndex = path
    },
    SET_NAV_ACTIVE_INDEX: (state, path) => {
      state.navbar.activeIndex = path
    },
    SET_WEBSITE_ID: (state, data) => {
      state.websiteId = data
    }
  }
}

export default app
