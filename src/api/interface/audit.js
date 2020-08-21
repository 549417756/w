import request from '@/utils/request'

// 获取提现列表
const fetchWithdrawalList = query => {
  return request({
    url: '/withdraw',
    method: 'get',
    params: query
  })
}
const audit = data => {
  return request({
    url: '/withdraw/check',
    method: 'post',
    data
  })
}
export default {
  fetchWithdrawalList,
  audit
}
