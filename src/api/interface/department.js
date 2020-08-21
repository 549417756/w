import request from '@/utils/request'
// 学校初始化的表格数据请求
const departmentList = query => {
  return request({
    url: '/school/group',
    method: 'get',
    params: query
  })
}
// 添加
const addDepartment = data => {
  return request({
    url: '/school/group/add',
    method: 'post',
    data
  })
}
// 编辑
const editDepartment = data => {
  return request({
    url: '/school/group/edit',
    method: 'post',
    data
  })
}
// 删除
const deleDepartment = data => {
  return request({
    url: '/school/group/remove',
    method: 'post',
    data
  })
}

export default {
  departmentList,
  addDepartment,
  editDepartment,
  deleDepartment
}

