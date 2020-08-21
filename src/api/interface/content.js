import request from '@/utils/request'

// 获取推送分类列表
const fetchContentClassifyList = query => {
  return request({
    url: '/push/category',
    method: 'get',
    params: query
  })
}

// 获取推送分类列表(不带分页)
const fetchContentClassifyListNP = query => {
  return request({
    url: '/push/category/lists',
    method: 'get',
    params: query
  })
}

// 新增推送分类
const createContentClassify = data => {
  return request({
    url: '/push/category/add',
    method: 'post',
    data
  })
}

// 编辑推送分类
const editContentClassify = data => {
  return request({
    url: '/push/category/edit',
    method: 'post',
    data
  })
}

// 删除推送分类
const deleteContentClassify = data => {
  return request({
    url: '/push/category/remove',
    method: 'post',
    data
  })
}

// 获取内容列表
const fetchContenInfotList = query => {
  return request({
    url: '/push/library',
    method: 'get',
    params: query
  })
}

// 新增列表内容
const createContentInfo = data => {
  return request({
    url: '/push/library/add',
    method: 'post',
    data
  })
}

// 编辑列表内容
const editContentInfo = data => {
  return request({
    url: '/push/library/edit',
    method: 'post',
    data
  })
}

// 编辑列表内容详情
const fetchContentInfoDetail = query => {
  return request({
    url: '/push/library/detail',
    method: 'get',
    params: query
  })
}

// 删除列表内容
const deleteContentInfo = data => {
  return request({
    url: '/push/library/remove',
    method: 'post',
    data
  })
}

// 获取内容列表
const fetchContentRecordList = query => {
  return request({
    url: '/push',
    method: 'get',
    params: query
  })
}

// 删除推送记录
const deleteContentRecord = data => {
  return request({
    url: '/push/remove',
    method: 'post',
    data
  })
}
// 推送对象
const pushAdd = data => {
  return request({
    url: '/push/add',
    method: 'post',
    data
  })
}
// 推送对象
const deleteContent = data => {
  return request({
    url: '/push/library/remove',
    method: 'post',
    data
  })
}

export default {
  fetchContentClassifyList,
  fetchContentClassifyListNP,
  createContentClassify,
  editContentClassify,
  deleteContentClassify,
  fetchContenInfotList,
  createContentInfo,
  editContentInfo,
  fetchContentInfoDetail,
  deleteContentInfo,
  fetchContentRecordList,
  deleteContentRecord,
  pushAdd,
  deleteContent
}
