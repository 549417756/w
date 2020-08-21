import request from '@/utils/request'

// 获取课件试卷列表
const fetchCourseExamList = query => {
  return request({
    url: '/school/course',
    method: 'get',
    params: query
  })
}

// 新增课件试卷
const createCourseExam = data => {
  return request({
    url: '/school/course/add',
    method: 'post',
    data
  })
}

// 编辑课件试卷
const editCourseExam = data => {
  return request({
    url: '/school/course/edit',
    method: 'post',
    data
  })
}

// 删除课件试卷
const deleteCourseExam = data => {
  return request({
    url: '/school/course/remove',
    method: 'post',
    data
  })
}

// 获取课件试卷订单列表
const fetchOrderList = query => {
  return request({
    url: '/school/order',
    method: 'get',
    params: query
  })
}

// 获取用户课件试卷订单列表
const fetchUserOrderList = query => {
  return request({
    url: '/account/order',
    method: 'get',
    params: query
  })
}

export default {
  fetchCourseExamList,
  createCourseExam,
  editCourseExam,
  deleteCourseExam,
  fetchOrderList,
  fetchUserOrderList
}
