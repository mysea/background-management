import Lockr from 'lockr'
import { login } from '@/api/user'

const user = {
  state: {
    // 用户信息
    userInfo: null,
    // 权限信息
    allAuth: true, // 总权限信息
    background: {} // 后台管理权限
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ALL_AUTH: (state, allAuth) => {
      state.allAuth = allAuth
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
            commit('SET_ALL_AUTH', loginMsg.common_WebSites)
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
