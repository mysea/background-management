import request from '@/utils/request'
import { param } from '@/utils'
import URL from './url'

export function login (data) {
  return request.get(`${URL.LOGIN}/${data.employeeid}?password=${data.password}`)
}

export function getUsers (data) {
  return request.get(`${URL.GET_USERS}?${param(data)}`)
}

export function addUserRole (id, data) {
  return request.post(`${URL.ADD_USER_ROLE}/${id}/Common_Role`, data)
}

export function getUserRoles (id) {
  return request.get(`${URL.GET_USER_ROLES}/${id}/Common_Role`)
}

export function resetPassword (id, data) {
  return request.post(`${URL.LOGIN}/${id}?password=${data}`)
}
