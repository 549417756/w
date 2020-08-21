import request from '@/utils/request'

const timetableList = query => {
  return request({
    url: '/timetable',
    method: 'get',
    params: query
  })
}
const timetableAdd = data => {
  return request({
    url: '/timetable/add',
    method: 'post',
    data
  })
}
const timetableEdit = data => {
  return request({
    url: '/timetable/edit',
    method: 'post',
    data
  })
}
const timetableDele = data => {
  return request({
    url: '/timetable/remove',
    method: 'post',
    data
  })
}
export default {
  timetableList,
  timetableAdd,
  timetableEdit,
  timetableDele
}
