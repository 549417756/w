import request from '@/utils/request'
// 获取提现列表
const baseList = query => {
  return request({
    url: '/device/place',
    method: 'get',
    params: query
  })
}
const baseAdd = data => {
  return request({
    url: '/device/place/add',
    method: 'post',
    data
  })
}
const baseEdit = data => {
  return request({
    url: '/device/place/edit',
    method: 'post',
    data
  })
}
const baseDele = data => {
  return request({
    url: '/device/place/remove',
    method: 'post',
    data
  })
}
export default {
  baseList,
  baseAdd,
  baseEdit,
  baseDele
}
