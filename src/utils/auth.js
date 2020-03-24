import axios from 'axios'
import store from '@/store'
import Lockr from 'lockr'

export function removeAuth () {
  return new Promise((resolve, reject) => {
    Lockr.rm('Admin-Token')
    store.commit('SET_ALLAUTH', null)
    delete axios.defaults.headers['Admin-Token']
    resolve(true)
  })
}

export function addAuth (adminToken) {
  return new Promise((resolve, reject) => {
    Lockr.set('Admin-Token', adminToken)
    axios.defaults.headers['Admin-Token'] = adminToken
    resolve(true)
  })
}

export function getAuth () {
  // if (Lockr.get('Admin-Token') && !axios.defaults.headers['Admin-Token']) {
  //   axios.defaults.headers['Admin-Token'] = Lockr.get('Admin-Token')
  // }
  // if (axios.defaults.headers['Admin-Token']) {
  //   return true
  // }
  // return false
  return true
}
