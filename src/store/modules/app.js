const app = {
  state: {
    sidebar: {
      activeIndex: ''
    },
    navbar: {
      activeIndex: ''
    },
    website: {
      label: '',
      value: ''
    }
  },
  mutations: {
    SET_ACTIVE_INDEX: (state, path) => {
      state.sidebar.activeIndex = path
    },
    SET_NAV_ACTIVE_INDEX: (state, path) => {
      state.navbar.activeIndex = path
    },
    SET_WEBSITE: (state, data) => {
      state.website = data
    }
  }
}

export default app
