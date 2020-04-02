import axios from 'axios'
import Lockr from 'lockr'
import store from '@/store'
import { toast, confirm } from './toast'

const http = axios.create({
  timeout: 15 * 1000
})

http.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + Lockr.get('Authorization')
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
http.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {
      const status = err.response.status
      switch (status) {
        case 500:
          toast('error', '服务器500错误')
          break
        case 401:
          confirm('授权已过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('logout')
            location.reload()
          }).catch(() => {})
          break
        default:
          break
      }
    }
    return Promise.reject(err)
  }
)

export default http
