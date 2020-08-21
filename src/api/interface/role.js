import request from '@/utils/request'
// 列表
const roleList = query => {
  return request({
    url: '/role',
    method: 'get',
    params: query
  })
}
// 添加
const roleAdd = data => {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}
// 编辑
const roleEdit = data => {
  return request({
    url: '/role/edit',
    method: 'post',
    data
  })
}
// 删除
const roleDele = data => {
  return request({
    url: '/role/remove',
    method: 'post',
    data
  })
}
// 分配列表
const permissionList = query => {
  return request({
    url: '/permission',
    method: 'get',
    params: query
  })
}
// 获得自身已有的权限
const fetchRolePermission = query => {
  return request({
    url: '/role/detail',
    method: 'get',
    params: query
  })
}
export default {
  roleList,
  roleAdd,
  roleEdit,
  roleDele,
  permissionList,
  fetchRolePermission
}
