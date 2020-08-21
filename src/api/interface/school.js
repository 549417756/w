import request from '@/utils/request'
// 学校初始化的表格数据请求
const schoolList = query => {
  return request({
    url: '/school',
    method: 'get',
    params: query
  })
}
// 创建学校
const addSchool = data => {
  return request({
    url: '/school/add',
    method: 'post',
    data
  })
}
// 删除
const deleteSchool = data => {
  return request({
    url: '/school/remove',
    method: 'post',
    data
  })
}
// 编辑
const editSchool = data => {
  return request({
    url: '/school/edit',
    method: 'post',
    data
  })
}
// 根据省市县获取学校列表
const fetchSchoolList = query => {
  return request({
    url: '/school/lists',
    method: 'get',
    params: query
  })
}
// 进入学校
const goSchool = query => {
  return request({
    url: '/auth/convert',
    method: 'get',
    params: query
  })
}
// 退出学校
const exitSchool = () => {
  return request({
    url: '/auth/logout/school',
    method: 'get'
  })
}
export default {
  schoolList,
  addSchool,
  deleteSchool,
  editSchool,
  fetchSchoolList,
  goSchool,
  exitSchool
}
