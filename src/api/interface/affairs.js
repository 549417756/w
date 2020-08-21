import request from '@/utils/request'

// 获取作业列表
const fetchHomeworkList = query => {
  return request({
    url: '/task',
    method: 'get',
    params: query
  })
}

// 新增作业
const createHomework = data => {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

// 编辑作业
const editHomework = data => {
  return request({
    url: '/task/edit',
    method: 'post',
    data
  })
}

// 删除作业
const deleteHomework = data => {
  return request({
    url: '/task/remove',
    method: 'post',
    data
  })
}

// 获取课程表列表
const fetchScheduleList = query => {
  return request({
    url: '/schedule',
    method: 'get',
    params: query
  })
}

// 新增课程表列表
const createSchedule = data => {
  return request({
    url: '/schedule/add',
    method: 'post',
    data
  })
}

// 编辑课程表列表
const editSchedule = data => {
  return request({
    url: 'schedule/edit',
    method: 'post',
    data
  })
}

export default {
  fetchHomeworkList,
  createHomework,
  editHomework,
  deleteHomework,
  fetchScheduleList,
  createSchedule,
  editSchedule
}
