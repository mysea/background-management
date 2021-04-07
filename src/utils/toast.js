import { Message, MessageBox } from 'element-ui'

export function toast (type, message, duration = 3000) {
  return Message({
    type,
    message,
    duration
  })
}

export function saveSuccessToast () {
  return toast('success', '保存成功')
}

export function deleteSuccessToast () {
  return toast('success', '删除成功')
}

export function confirm (message, title, options) {
  return MessageBox.confirm(message, title, options)
}

export function deleteConfirm () {
  return confirm(
    '确定删除吗？',
    '提示',
    {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }
  )
}
