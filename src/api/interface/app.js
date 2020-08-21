import request from '@/utils/request'

// 获取反馈列表
const fetchFeedbacklList = query => {
  return request({
    url: '/feedback',
    method: 'get',
    params: query
  })
}

// 删除反馈
const deleteFeedback = data => {
  return request({
    url: '/feedback/remove',
    method: 'post',
    data
  })
}

// 获取轮播图列表
const fetchSlidelList = query => {
  return request({
    url: '/slide',
    method: 'get',
    params: query
  })
}

// 新增轮播图
const createSlide = data => {
  return request({
    url: '/slide/add',
    method: 'post',
    data
  })
}

// 编辑轮播图
const editSlide = data => {
  return request({
    url: '/slide/edit',
    method: 'post',
    data
  })
}

// 删除轮播图
const deleteSlide = data => {
  return request({
    url: '/slide/remove',
    method: 'post',
    data
  })
}

export default {
  fetchFeedbacklList,
  deleteFeedback,
  fetchSlidelList,
  createSlide,
  editSlide,
  deleteSlide
}
