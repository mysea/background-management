import { PopupManager } from 'element-ui/lib/utils/popup'

// 生成模块树
export function createTree (data, pid) {
  const treeList = []
  data.map(item => {
    if (item.parent_id === pid) {
      item.children = createTree(data, item.id)
      treeList.push({
        id: item.id,
        label: item.name,
        children: item.children,
        orignData: item
      })
    }
  })
  return treeList
}

// 生成部门树
export function getTree (data, pid) {
  const treeList = []
  data.map(item => {
    if (item.parentid === pid) {
      item.children = getTree(data, item.departmentid)
      treeList.push({
        id: item.departmentid,
        label: item.departmentname,
        children: item.children
      })
    }
  })
  return treeList
}

// 获取最大的ZIndex
export function getMaxIndex () {
  return PopupManager.nextZIndex()
}

// 将对象转换为URL的参数
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
