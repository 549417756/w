import request from '@/utils/request'

// 列表
const subjectList = query => {
  return request({
    url: '/setting/subject',
    method: 'get',
    params: query
  })
}
// 增加
const subjectAdd = data => {
  return request({
    url: '/setting/subject/add',
    method: 'post',
    data
  })
}
// 删除
const subjectDele = data => {
  return request({
    url: '/setting/subject/remove',
    method: 'post',
    data
  })
}
// 编辑
const subjectEdit = data => {
  return request({
    url: '/setting/subject/edit',
    method: 'post',
    data
  })
}
export default {
  subjectList,
  subjectAdd,
  subjectDele,
  subjectEdit
}
