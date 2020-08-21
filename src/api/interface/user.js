import request from '@/utils/request'

// 登录
export function login (data) {

  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// 验证码登录
export function codelogin (data) {
  console.log(data)
  return request({
    url: '/smsLogin',
    method: 'post',
    data
  })
}
// 获取用户路由
export function getRouter () {
  return request({
    url: '/auth/menu',
    method: 'get',
    params: {}
  })
}
// 获取用户信息
export function getInfo () {
  return request({
    url: '/auth/info',
    method: 'get',
    params: {}
  })
}

// 退出
export function logout () {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}

// 左侧菜单接口
export function getMenu (query) {
  return request({
    url: '/auth/menu',
    method: 'get',
    params: query
  })
}
// 获取站点
export function siteId (data) {
  // console.log(data)
  return request({
    url: '/site/findSite',
    method: 'post',
    data
  })
}
