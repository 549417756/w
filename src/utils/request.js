import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = false
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    const token = getToken('Token')
    if (!config.headers['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      let json = jsON.parse(jsON.stringify(config.params));
      //一些参数处理
    } else {
      config.data = config.data || {};
      //一些参数处理
    }
    return config;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  },
  error => {
    // 服务器返回不是 2 开头的情况，会进入这个回调
    const responseCode = error.response.status
    switch (responseCode) {
      // 401token过期
      case 401:
        // to re-login
        MessageBox.confirm('登录信息过期，请重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        break
      // 404请求不存在
      case 404:
        Message({
          message: '网络请求不存在',
          type: 'error'
        })
        break
      // 422参数错误
      case 422:
        Message({
          message: `请检查参数${error.response.data.msg}`,
          type: 'error'
        })
        break
      // 其他错误，直接抛出错误提示
      default:
        Message({
          message: `连接错误${error.response.status}`,
          type: 'error'
        })
    }
    return Promise.reject(error)
  }
)

export default service
