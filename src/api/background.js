import request from '@/utils/request'
import { param } from '@/utils'
import URL from './url'

// 站点管理
export function getWebsites (data) {
  return request.get(`${URL.GET_WEBSITES}?${param(data)}`)
}

export function addWebsite (data) {
  return request.post(URL.ADD_WEBSITE, data)
}

export function updateWebsite (id, data) {
  return request.put(`${URL.UPDATE_WEBSITE}/${id}`, data)
}

export function deleteWebsite (id) {
  return request.delete(`${URL.DELETE_WEBSITE}/${id}`)
}

// 部门管理
export function getOrgs (data) {
  return request.get(`${URL.GET_ORGS}?${param(data)}`)
}

// 模块管理
export function getModules (data) {
  return request.get(`${URL.GET_MODULES}?${param(data)}`)
}

export function addModule (data) {
  return request.post(URL.ADD_MODULE, data)
}

export function updateModule (id, data) {
  return request.put(`${URL.UPDATE_MODULE}/${id}`, data)
}

export function deleteModule (id) {
  return request.delete(`${URL.DELETE_MODULE}/${id}`)
}

// 权限管理
export function getPrivileges (data) {
  return request.get(`${URL.GET_PRIVILEGES}?${param(data)}`)
}

export function addPrivilege (data) {
  return request.post(URL.ADD_PRIVILEGE, data)
}

export function updatePrivilege (id, data) {
  return request.put(`${URL.UPDATE_PRIVILEGE}/${id}`, data)
}

export function deletePrivilege (id) {
  return request.delete(`${URL.DELETE_PRIVILEGE}/${id}`)
}

export function getModulePrivilege () {
  return request.get(`${URL.GET_MODULE_PRIVILEGE}`)
}

// 角色管理
export function getRoles (data) {
  return request.get(`${URL.GET_ROLES}?${param(data)}`)
}

export function addRole (data) {
  return request.post(URL.ADD_ROLE, data)
}

export function updateRole (id, data) {
  return request.put(`${URL.UPDATE_ROLE}/${id}`, data)
}

export function deleteRole (id) {
  return request.delete(`${URL.DELETE_ROLE}/${id}`)
}

export function getRoleModules (id) {
  return request.get(`${URL.GET_ROLE_MODULES}/${id}/Common_Module`)
}

export function addRoleModule (id, data) {
  return request.post(`${URL.ADD_ROLE_MODULE}/${id}/Common_Privilege`, data)
}

export function getRoleUsers (id) {
  return request.get(`${URL.GET_ROLE_USERS}/${id}/Common_User`)
}

export function addRoleUser (id, data) {
  return request.post(`${URL.ADD_ROLE_USER}/${id}/Common_User`, data)
}

// 字典管理
export function getDictionarys (data) {
  return request.get(`${URL.GET_DICTIONARYS}?${param(data)}`)
}

export function addDictionary (data) {
  return request.post(URL.ADD_DICTIONARY, data)
}

export function updateDictionary (id, data) {
  return request.put(`${URL.UPDATE_DICTIONARY}/${id}`, data)
}

export function deleteDictionary (id) {
  return request.delete(`${URL.DELETE_DICTIONARY}/${id}`)
}

// 全球化
export function getLocales (data) {
  return request.get(`${URL.GET_LOCALES}?${param(data)}`)
}

export function addLocale (data) {
  return request.post(URL.ADD_LOCALE, data)
}

export function updateLocale (id, data) {
  return request.put(`${URL.UPDATE_LOCALE}/${id}`, data)
}

export function deleteLocale (id) {
  return request.delete(`${URL.DELETE_LOCALE}/${id}`)
}
