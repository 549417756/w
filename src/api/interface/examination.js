import request from '@/utils/request'

// 列表
const examList = query => {
  return request({
    url: '/setting/exam',
    method: 'get',
    params: query
  })
}
// 增加
const examAdd = data => {
  return request({
    url: '/setting/exam/add',
    method: 'post',
    data
  })
}
// 编辑
const examEdit = data => {
  return request({
    url: '/setting/exam/edit',
    method: 'post',
    data
  })
}
// 删除
const examDele = data => {
  return request({
    url: '/setting/exam/remove',
    method: 'post',
    data
  })
}
export default {
  examList,
  examAdd,
  examEdit,
  examDele
}
