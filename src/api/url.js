const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://pmtest.grgbanking.com:9000' : '/api'

function urlHandle (url) {
  return `${BASE_URL}${url}`
}

const URL = {
  // 后台管理
  // 用户管理
  LOGIN: urlHandle('/api/Common_User'),
  GET_USERS: urlHandle('/api/Common_User'),
  GET_USER_MENUS: urlHandle('/api/Common_User/{employeeid}/Common_Module'),
  GET_USER_ROLES: urlHandle('/api/Common_User'),
  ADD_USER_ROLE: urlHandle('/api/Common_User'),
  // 部门管理
  GET_ORGS: urlHandle('/api/Common_Org'),
  // 模块管理
  GET_MODULES: urlHandle('/api/Common_Module'),
  ADD_MODULE: urlHandle('/api/Common_Module'),
  UPDATE_MODULE: urlHandle('/api/Common_Module'),
  DELETE_MODULE: urlHandle('/api/Common_Module'),
  GET_MODULE_PRIVILEGE: urlHandle('/api/Common_Module?showPrivilege=true'),
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
  GET_ROLE_MODULES: urlHandle('/api/Common_Role'),
  ADD_ROLE_MODULE: urlHandle('/api/Common_Role'),
  ADD_ROLE_USER: urlHandle('/api/Common_Role'),
  // 字典管理
  GET_DICTIONARYS: urlHandle('/api/Common_Dictionary'),
  ADD_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  UPDATE_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  DELETE_DICTIONARY: urlHandle('/api/Common_Dictionary'),
  // 全球化
  GET_LOCALES: urlHandle('/api/Common_LocalizedLabel'),
  ADD_LOCALE: urlHandle('/api/Common_LocalizedLabel'),
  UPDATE_LOCALE: urlHandle('/api/Common_LocalizedLabel'),
  DELETE_LOCALE: urlHandle('/api/Common_LocalizedLabel')
}

export default URL
