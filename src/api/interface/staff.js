import request from '@/utils/request'

// 列表
const staffList = query => {
  return request({
    url: '/school/staff',
    method: 'get',
    params: query
  })
}
// 增加
const addStaff = data => {
  return request({
    url: '/school/staff/add',
    method: 'post',
    data
  })
}
// 获取职位和部门
const getDepartment = query => {
  return request({
    url: '/school/group/lists',
    method: 'get',
    params: query
  })
}
// 编辑
const staffEdit = data => {
  return request({
    url: '/school/staff/edit',
    method: 'post',
    data
  })
}
// 删除
const deleEdit = data => {
  return request({
    url: '/school/staff/remove',
    method: 'post',
    data
  })
}
// 导入前给后端检查是否有重复
const checkStaff = data => {
  return request({
    url: '/school/staff/check',
    method: 'post',
    data
  })
}
// 检查结束后真正的导入到后端
const importStaff = data => {
  return request({
    url: '/school/staff/import',
    method: 'post',
    data
  })
}
// 获取分配的角色
const staffRole = query => {
  return request({
    url: '/role',
    method: 'get',
    params: query
  })
}
export default {
  staffList,
  addStaff,
  getDepartment,
  staffEdit,
  deleEdit,
  checkStaff,
  importStaff,
  staffRole
}
