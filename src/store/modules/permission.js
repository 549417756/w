import path from 'path'
import { asyncRoutes, constantRoutes } from '@/router'

// 深拷贝异步路由
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

// 通过递归过滤异步路由表
export function generateTree(routes, basePath, roles) {
  const res = []
  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)

    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, roles)
    }

    if (roles.includes(routePath) || (route.children && route.children.length >= 1)) {
      res.push(route)
    }
  }
  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = generateTree(deepClone(asyncRoutes), '/', roles)
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
