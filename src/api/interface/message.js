import request from '@/utils/request'

// 获取分类列表
const fetchMsgClassifyList = query => {
  return request({
    url: '/message/category',
    method: 'get',
    params: query
  })
}

// 获取分类列表(不带分页)
const fetchMsgClassifyListNP = query => {
  return request({
    url: '/message/category/lists',
    method: 'get',
    params: query
  })
}

// 获取分类详情
const fetchMsgClassifyDetail = query => {
  return request({
    url: '/message/detail',
    method: 'get',
    params: query
  })
}

// 新增分类
const createMsgClassify = data => {
  return request({
    url: '/message/category/add',
    method: 'post',
    data
  })
}

// 编辑分类
const editMsgClassify = data => {
  return request({
    url: '/message/category/edit',
    method: 'post',
    data
  })
}

// 删除分类
const deleteMsgClassify = data => {
  return request({
    url: '/message/category/remove',
    method: 'post',
    data
  })
}

// 获取消息列表
const fetchMessageList = query => {
  return request({
    url: '/message',
    method: 'get',
    params: query
  })
}

// 新增消息
const createMessage = data => {
  return request({
    url: '/message/add',
    method: 'post',
    data
  })
}

// 编辑消息
const editMessage = data => {
  return request({
    url: '/message/edit',
    method: 'post',
    data
  })
}

// 删除消息
const deleteMessage = data => {
  return request({
    url: '/message/remove',
    method: 'post',
    data
  })
}

export default {
  fetchMsgClassifyList,
  fetchMsgClassifyListNP,
  fetchMsgClassifyDetail,
  createMsgClassify,
  editMsgClassify,
  deleteMsgClassify,
  fetchMessageList,
  createMessage,
  editMessage,
  deleteMessage
}
