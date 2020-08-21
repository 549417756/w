import request from '@/utils/request'

// 添加
const permissionsAdd = data => {
  return request({
    url: '/permission/add',
    method: 'post',
    data
  })
}
// 编辑
const permissionsEdit = data => {
  return request({
    url: '/permission/edit',
    method: 'post',
    data
  })
}
// 删除
const permissionDele = data => {
  return request({
    url: '/permission/remove',
    method: 'post',
    data
  })
}
// 分配
const permissionDistr = data => {
  return request({
    url: '/role/permission',
    method: 'post',
    data
  })
}
export default {
  permissionsAdd,
  permissionsEdit,
  permissionDele,
  permissionDistr
}
