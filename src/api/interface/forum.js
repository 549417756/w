import request from '@/utils/request'

// 获取论坛分类列表
const fetchForumClassifyList = query => {
  return request({
    url: '/bbs/category',
    method: 'get',
    params: query
  })
}

// 获取论坛分类列表(不带分页)
const fetchForumClassifyListNP = query => {
  return request({
    url: '/bbs/category/lists',
    method: 'get',
    params: query
  })
}

// 新增论坛分类
const createForumClassify = data => {
  return request({
    url: '/bbs/category/add',
    method: 'post',
    data
  })
}

// 编辑论坛分类
const editForumClassify = data => {
  return request({
    url: '/bbs/category/edit',
    method: 'post',
    data
  })
}

// 删除分类
const deleteForumClassify = data => {
  return request({
    url: '/bbs/category/remove',
    method: 'post',
    data
  })
}

// 获取话题列表
const fetchTopicList = query => {
  return request({
    url: '/bbs',
    method: 'get',
    params: query
  })
}

// 设置话题热门
const createTopic = data => {
  return request({
    url: '/school/course/add',
    method: 'post',
    data
  })
}

// 删除话题
const deleteTopic = data => {
  return request({
    url: '/bbs/remove',
    method: 'post',
    data
  })
}

// 获取话题详情
const fetchTopicDetails = query => {
  return request({
    url: '/bbs/detail',
    method: 'get',
    params: query
  })
}

// 获取话题回复列表
const fetchTopicReply = query => {
  return request({
    url: '/bbs/reply',
    method: 'get',
    params: query
  })
}

// 新增话题回复
const createTopicReply = data => {
  return request({
    url: '/bbs/reply/add',
    method: 'post',
    data
  })
}

// 删除话题回复
const deleteReply = data => {
  return request({
    url: '/bbs/reply/remove',
    method: 'post',
    data
  })
}

// 获取举报列表
const fetchReportList = query => {
  return request({
    url: '/bbs/report',
    method: 'get',
    params: query
  })
}

// 获取举报列表
const fetchReportDetails = query => {
  return request({
    url: '/bbs/report/detail',
    method: 'get',
    params: query
  })
}

// 删除举报
const deleteReport = data => {
  return request({
    url: '/bbs/report/remove',
    method: 'post',
    data
  })
}

// 设置有效无效举报
const setReport = query => {
  return request({
    url: '/bbs/report/processor',
    method: 'get',
    params: query
  })
}
const setHot = query => {
  return request({
    url: '/bbs/hot',
    method: 'get',
    params: query
  })
}

export default {
  fetchForumClassifyList,
  fetchForumClassifyListNP,
  createForumClassify,
  editForumClassify,
  deleteForumClassify,
  fetchTopicList,
  createTopic,
  deleteTopic,
  fetchTopicDetails,
  fetchTopicReply,
  createTopicReply,
  fetchReportList,
  deleteReply,
  fetchReportDetails,
  deleteReport,
  setReport,
  setHot
}
