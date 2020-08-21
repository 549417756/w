import request from '@/utils/request'
// 获取列表数据
const studentList = query => {
  return request({
    url: '/school/student',
    method: 'get',
    params: query
  })
}
// 增加
const studentAdd = data => {
  return request({
    url: '/school/student/add',
    method: 'post',
    data
  })
}
// 编辑
const studentEdit = data => {
  return request({
    url: '/school/student/edit',
    method: 'post',
    data
  })
}
// 删除
const studentDele = data => {
  return request({
    url: '/school/student/remove',
    method: 'post',
    data
  })
}
// 导入检查
const checkStudent = data => {
  return request({
    url: '/school/student/check',
    method: 'post',
    data
  })
}
// 批量导入
const importStudent = data => {
  return request({
    url: '/school/student/import',
    method: 'post',
    data
  })
}
// 根据年级班级获取学生列表
const fetchStudentById = query => {
  return request({
    url: '/school/student/lists',
    method: 'get',
    params: query
  })
}

export default {
  studentList,
  studentAdd,
  studentEdit,
  studentDele,
  checkStudent,
  importStudent,
  fetchStudentById
}

