import request from '@/utils/request'

// 获取学科列表
const userList = query => {
  return request({
    url: '/Publics/publicUserList',
    method: 'get',
    params: query
  })
}

// 获取学科列表
const fetchSubjectList = query => {
  return request({
    url: '/setting/subject',
    method: 'get',
    params: query
  })
}

// 获取年级列表
const fetchGradeList = query => {
  return request({
    url: '/setting/grade/lists',
    method: 'get',
    params: query
  })
}

// 获取设备异常信息
const fetchAbnormalList = query => {
  return request({
    url: '/abnormal',
    method: 'get',
    params: query
  })
}

// 获取教材版本
const fetchTextbook = query => {
  return request({
    url: '/public/textbook',
    method: 'get',
    params: query
  })
}

const fetchAreaList = query => {
  return request({
    url: '/area',
    method: 'get',
    params: query
  })
}

export default {
  userList,
  fetchSubjectList,
  fetchGradeList,
  fetchAbnormalList,
  fetchAreaList,
  fetchTextbook
}
