import Lockr from 'lockr'
import { login } from '@/api/user'

const formatWebsites = function (websiteData) {
  const websites = []
  websiteData.forEach(website => {
    websites.push({
      name: website.name,
      code: website.description,
      url: website.home_url,
      modules: formatModules(website.common_Modules, null),
      roles: formatRoles(website.common_Roles)
    })
  })
  return websites
}

const formatRoles = function (roles) {
  let tempList = []
  tempList = roles.map(roleItem => {
    return {
      id: roleItem.id,
      name: roleItem.name
    }
  })
  return tempList
}

const formatModules = function (modules, pid) {
  const tempList = []
  modules.forEach(moduleItem => {
    if (moduleItem.parent_id === pid) {
      const children = formatModules(modules, moduleItem.id)
      tempList.push({
        id: moduleItem.id,
        name: moduleItem.name,
        code: moduleItem.code,
        url: moduleItem.url,
        icon: moduleItem.icon_name,
        is_auto_expand: moduleItem.is_auto_expand,
        privileges: moduleItem.common_Privileges.map(privilege => {
          return privilege.type
        }),
        children: children
      })
    }
  })
  return tempList
}

const user = {
  state: {
    // 用户信息
    userInfo: null,
    // 权限信息
    websites: true, // 总权限信息
    background: {} // 后台管理权限
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_WEBSITES: (state, websites) => {
      state.websites = websites
    },
    SET_BACKGROUND: (state, privilege) => {
      state.background = privilege
    }
  },
  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          if (res) {
            const loginMsg = res.loginMsg
            commit('SET_WEBSITES', formatWebsites(loginMsg.common_WebSites))
            delete loginMsg.common_WebSites
            commit('SET_USER_INFO', loginMsg)
            Lockr.set('Authorization', res.jwtToken)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        Lockr.rm('Authorization')
        resolve()
      })
    }
  }
}

export default user
