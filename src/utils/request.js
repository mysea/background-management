import axios from 'axios'
import Lockr from 'lockr'

const http = axios.create({
  timeout: 15 * 1000
})

http.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + Lockr.get('Authorization')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
