import request from '@/utils/request'
// 学校初始化的表格数据请求
const placeList = query => {
  return request({
    url: '/place',
    method: 'get',
    params: query
  })
}
// 获取基点信息
const placeInfo = query => {
  return request({
    url: '/device/place/lists',
    method: 'get',
    params: query
  })
}
const placeAdd = data => {
  return request({
    url: '/place/add',
    method: 'post',
    data
  })
}
const placeDele = data => {
  return request({
    url: '/place/remove',
    method: 'post',
    data
  })
}
const placeEidt = data => {
  return request({
    url: '/place/edit',
    method: 'post',
    data
  })
}
export default {
  placeList,
  placeInfo,
  placeAdd,
  placeDele,
  placeEidt
}
