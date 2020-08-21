import { login, logout, getInfo, getMenu, codelogin, siteId } from '@/api/interface/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message, Loading } from 'element-ui'

const state = {
  token: getToken('Token'),
  user_info: null,
  roles: [],
  siteId: '',
}

const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, user_info) => {
    state.user_info = user_info
    if (state.user_info.type === 1) {
      setToken('type', state.user_info.type)
    }
  }
}

const actions = {

  // user login
  login ({ commit }, userInfo) {
    const loading = Loading.service({
      lock: true,
      text: '登录中....',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    console.log(userInfo)
    const { imageCode, password, siteId, code, mobile } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile, password: password, imageCode: imageCode, siteId: siteId, code: code })
        .then(response => {
          if (response.code === 11001) {
            Message({
              message: '账号或密码错误',
              type: 'error'
            })
          }
          loading.close()
          const { data } = response
          // 把token放在cookie中
          setToken('Token', data.access_token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // codelogin
  codelogin ({ commit }, userInfo) {
    const loading = Loading.service({
      lock: true,
      text: '登录中....',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const { mobile, siteId, smsCode } = userInfo
    return new Promise((resolve, reject) => {
      codelogin({ mobile: mobile, siteId: siteId, smsCode: smsCode })
        .then(response => {
          if (response.code === 11001) {
            Message({
              message: '账号或密码错误',
              type: 'error'
            })
          }
          loading.close()
          const { data } = response
          // 把token放在cookie中
          setToken('Token', data.access_token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // info
  info ({ commit, state }, obj) {
    const info = Object.assign(state.user_info, obj)
    commit('SET_INFO', info)
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('验证失败，请再次登录。')
          }
          const { roles, ...user_info } = data
          // roles must be a non-empty array
          if (!roles) {
            reject('getInfo：roles必须是非null！')
          }
          commit('SET_ROLES', roles)
          commit('SET_INFO', user_info)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user menu
  getMenu ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('验证失败，请再次登录。')
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_ROLES', [])
          removeToken('Token')
          removeToken('type')
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      removeToken('Token')
      resolve()
    })
  },

  siteId ({ commit }, data) {
    return new Promise((resolve, reject) => {
      siteId()
        .then(response => {
          // console.log(response)
          const { data } = response
          // console.log(data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
