import request from '@/utils/request'

// 列表
const fractionList = query => {
  return request({
    url: '/student/mark',
    method: 'get',
    params: query
  })
}
// 编辑
const fractionEdit = data => {
  return request({
    url: '/student/mark/edit',
    method: 'post',
    data
  })
}
// 增加
const fractionAdd = data => {
  return request({
    url: '/student/mark/add',
    method: 'post',
    data
  })
}
// 删除
const fractionDele = data => {
  return request({
    url: '/student/mark/remove',
    method: 'post',
    data
  })
}
// 考试成绩
const exam = query => {
  return request({
    url: '/setting/exam/lists',
    method: 'get',
    params: query
  })
}
// 通过学号查找学生信息
const permisInfo = query => {
  return request({
    url: '/school/student/detail',
    method: 'get',
    params: query
  })
}
// 学生成绩导入前检查
const fractionCheck = data => {
  return request({
    url: '/student/mark/check',
    method: 'post',
    data
  })
}
// 学生成绩导入
const fractionImport = data => {
  return request({
    url: '/student/mark/import',
    method: 'post',
    data
  })
}
// 学生成绩详情
const fractionMark = query => {
  return request({
    url: '/school/student/mark',
    method: 'get',
    params: query
  })
}
// 更新排名的
const fractionRanking = query => {
  return request({
    url: '/student/mark/ranking',
    method: 'get',
    params: query
  })
}
export default {
  fractionList,
  fractionEdit,
  fractionAdd,
  fractionDele,
  exam,
  permisInfo,
  fractionCheck,
  fractionImport,
  fractionMark,
  fractionRanking
}
