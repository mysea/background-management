import Lockr from 'lockr'
import { login } from '@/api/user'

const user = {
  state: {
    // 用户信息
    userInfo: null,
    // 权限信息
    // allAuth: null, // 总权限信息
    allAuth: true, // 总权限信息
    background: {} // 后台管理
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
            Lockr.set('Authorization', res)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAuth ({ commit }, data) {
      return new Promise((resolve, reject) => {
      })
    },
    getUserInfo ({ commit }, data) {
      return new Promise((resolve, reject) => {
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
