const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://10.252.254.182:9981' : '/api'

function urlHandle (url) {
  return `${BASE_URL}${url}`
}

const URL = {
  // 后台管理
  // 站点管理
  GET_WEBSITES: urlHandle('/api/Common_WebSite'),
  ADD_WEBSITE: urlHandle('/api/Common_WebSite'),
  UPDATE_WEBSITE: urlHandle('/api/Common_WebSite'),
  DELETE_WEBSITE: urlHandle('/api/Common_WebSite'),
  ADD_WEBSITE_USER: urlHandle('/api/Common_WebSite'),
  // 用户管理
  LOGIN: urlHandle('/api/Common_User'),
  GET_USERS: urlHandle('/api/Common_User'),
  GET_USER_ROLES: urlHandle('/api/Common_User'),
  ADD_USER_ROLE: urlHandle('/api/Common_User'),
  RESET_PASSWORD: urlHandle('/api/Common_User'),
  // 部门管理
  GET_ORGS: urlHandle('/api/Common_Org'),
  // 模块管理
  GET_MODULES: urlHandle('/api/Common_Module'),
  ADD_MODULE: urlHandle('/api/Common_Module'),
  UPDATE_MODULE: urlHandle('/api/Common_Module'),
  DELETE_MODULE: urlHandle('/api/Common_Module'),
  // 权限管理
  GET_PRIVILEGES: urlHandle('/api/Common_Privilege'),
  ADD_PRIVILEGE: urlHandle('/api/Common_Privilege'),
  UPDATE_PRIVILEGE: urlHandle('/api/Common_Privilege'),
  DELETE_PRIVILEGE: urlHandle('/api/Common_Privilege'),
  // 角色管理
  GET_ROLES: urlHandle('/api/Common_Role'),
  ADD_ROLE: urlHandle('/api/Common_Role'),
  UPDATE_ROLE: urlHandle('/api/Common_Role'),
  DELETE_ROLE: urlHandle('/api/Common_Role'),
  GET_ROLE_PRIVILEGES: urlHandle('/api/Common_Role'),
  ADD_ROLE_PRIVILEGE: urlHandle('/api/Common_Role'),
  GET_ROLE_USERS: urlHandle('/api/Common_Role'),
  ADD_ROLE_USER: urlHandle('/api/Common_Role'),
  // 字典管理
  GET_DICTIONARYS: urlHandle('/api/Common_Dictionary'),
  ADD_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  UPDATE_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  DELETE_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  // 全球化
  ADD_LOCALE: urlHandle('/api/Common_LocalizedLabel/List')
}

export default URL
