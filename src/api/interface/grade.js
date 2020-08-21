import request from '@/utils/request'
// 获取列表
const gradeList = query => {
  return request({
    url: '/setting/grade',
    method: 'get',
    params: query
  })
}
// 增加
const addGrade = data => {
  return request({
    url: '/setting/grade/add',
    method: 'post',
    data
  })
}
// 编辑
const editGrade = data => {
  return request({
    url: '/setting/grade/edit',
    method: 'post',
    data
  })
}
// 在编辑班级的时候需从员工里选择班主任
const classList = query => {
  return request({
    url: '/school/staff/lists',
    method: 'get',
    params: query
  })
}
// 删除
const staffDele = data => {
  return request({
    url: '/setting/grade/remove',
    method: 'post',
    data
  })
}
export default {
  gradeList,
  addGrade,
  editGrade,
  classList,
  staffDele
}
