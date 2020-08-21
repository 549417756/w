import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // get token from cookie
import { getPageTitle } from '@/utils'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/forgetPassword', '/register', '/site', '/live', '/user1', '/settig/role', '/settig/organization', '/live/questions', '/settig/initialization', '/live/livemgmt', '/live/learningrecord', '/live/appointment', '/a', '/videotape/courseware'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()
  document.title = getPageTitle(to.meta.title) // 获取标题
  // 确定用户是否已登录
  const hasToken = getToken('Token')
  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获取了他的权限角色
      const hasRoles = store.getters.roles && Object.keys(store.getters.roles).length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 注意：角色必须是对象！
          await store.dispatch('user/getInfo')
          // 获取左侧菜单
          const roles = await store.dispatch('user/getMenu')
          // 根据角色生成可访问的路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack方法确保addRoutes完整
          // 设置replace：true，因此导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他无权访问的页面将重定向到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
