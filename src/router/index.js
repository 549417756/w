import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const routerList = []
function registerRouter (router) {
  router.keys().forEach(key => {
    routerList.push(router(key).default)
  })
  routerList.sort(compare('sort'))
}
// sort
function compare (prop) {
  return function (a, b) {
    const value1 = a[prop]
    const value2 = b[prop]
    return value1 - value2
  }
}

// 注册路由
registerRouter(require.context('./', true, /\.router\.js/))
// console.log(require.context('./', true, /\.router\.js/).keys())
// 没有权限要求的基页所有角色可以访问
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forgetPassword',
    component: () => import('@/views/password/forgetpassword'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/password/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  // 站点
  {
    path: '/site',
    component: Layout,
    redirect: '/site',
    name: 'site',
    hidden: true,
    children: [
      {
        path: '/site',
        hidden: true,
        component: () => import('@/views/site/index'),
        name: 'sitemgmt',
        meta: { title: '站点管理' }
      }
    ]
  },
  // 内容
  {
    path: '/column',
    component: Layout,
    redirect: '/column/article',
    name: 'column',
    hidden: true,
    meta: { title: '内容管理', icon: 'user' },
    children: [
      {
        path: 'article',
        hidden: true,
        component: () => import('@/views/column/index'),
        name: 'articlemgmt',
        meta: { title: '文章管理' }
      },
      {
        path: 'addarticle',
        hidden: true,
        component: () => import('@/views/column/addarticle'),
        name: 'addarticle',
        meta: { title: '新建文章' }
      }
    ]
  },
  // 用户
  {
    path: '/user1',
    component: Layout,
    redirect: '/user_',
    name: 'user',
    hidden: true,
    children: [
      {
        path: '/user1',
        hidden: true,
        component: () => import('@/views/user_/index'),
        name: 'userindex',
        meta: { title: '用户管理', icon: 'user' },
      }
    ]
  },
  // 用户
  {
    path: '/me',
    component: Layout,
    redirect: '/me',
    name: 'me',
    hidden: true,
    children: [
      {
        path: '/me',
        hidden: true,
        component: () => import('@/views/me/index'),
        name: 'me1',
        meta: { title: '账户管理', icon: 'user' },
      }
    ]
  },
  {
    path: '/a',
    component: Layout,
    redirect: '/a',
    name: 'a',
    hidden: true,
    children: [
      {
        path: '/a',
        hidden: true,
        component: () => import('@/views/me/a'),
        name: 'a1',
        meta: { title: '账户管理', icon: 'user' },
      }
    ]
  },
  // 直播
  {
    path: '/live',
    component: Layout,
    redirect: '/live',
    name: 'live',
    hidden: true,
    meta: { title: '项目直播', icon: 'user' },
    children: [
      {
        path: '/live',
        hidden: true,
        component: () => import('@/views/live/project'),
        name: 'project',
        meta: { title: '直播项目管理', icon: 'user' },
      },
      {
        path: 'newproject',
        hidden: true,
        component: () => import('@/views/live/newproject'),
        name: 'newproject',
        meta: { title: '新增项目', icon: 'user' },
      },
      {
        path: 'livemgmt',
        hidden: true,
        component: () => import('@/views/live/livemgmt'),
        name: 'livemgmt',
        meta: { title: '直播管理', icon: 'user' },
      },
      {
        path: 'learningrecord',
        hidden: true,
        component: () => import('@/views/live/learningrecord'),
        name: 'learningrecord',
        meta: { title: '学习记录', icon: 'user' },
      },
      {
        path: 'appointment',
        hidden: true,
        component: () => import('@/views/live/appointment'),
        name: 'appointment',
        meta: { title: '预约查看', icon: 'user' },
      }, {
        path: 'questions',
        hidden: true,
        component: () => import('@/views/live/questions'),
        name: 'questions',
        meta: { title: '试题问卷', icon: 'user' },
      }
    ]
  },
  // 录播
  {
    path: '/videotape',
    component: Layout,
    redirect: '',
    name: 'videotape',
    hidden: true,
    meta: { title: '录播管理', icon: 'user' },
    children: [
      {
        path: 'courseware',
        hidden: true,
        component: () => import('@/views/videotape/courseware'),
        name: 'courseware',
        meta: { title: '课件库', icon: 'user' },
      },
      // {
      //   path: 'newproject',
      //   hidden: true,
      //   component: () => import('@/views/live/newproject'),
      //   name: 'newproject',
      //   meta: { title: '新增项目', icon: 'user' },
      // },
      // {
      //   path: 'livemgmt',
      //   hidden: true,
      //   component: () => import('@/views/live/livemgmt'),
      //   name: 'livemgmt',
      //   meta: { title: '直播管理', icon: 'user' },
      // },
      // {
      //   path: 'learningrecord',
      //   hidden: true,
      //   component: () => import('@/views/live/learningrecord'),
      //   name: 'learningrecord',
      //   meta: { title: '学习记录', icon: 'user' },
      // },
      // {
      //   path: 'appointment',
      //   hidden: true,
      //   component: () => import('@/views/live/appointment'),
      //   name: 'appointment',
      //   meta: { title: '预约查看', icon: 'user' },
      // }, {
      //   path: 'questions',
      //   hidden: true,
      //   component: () => import('@/views/live/questions'),
      //   name: 'questions',
      //   meta: { title: '试题问卷', icon: 'user' },
      // }
    ]
  },
  // 设置
  {
    path: '/settig',
    component: Layout,
    redirect: '/settig/role',
    name: 'setting',
    hidden: true,
    meta: { title: '设置', icon: 'user' },
    children: [
      {
        path: 'role',
        hidden: true,
        component: () => import('@/views/settig/role'),
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: 'organization',
        hidden: true,
        component: () => import('@/views/settig/organization'),
        name: 'Organization',
        meta: { title: '组织架构' }
      },
      {
        path: 'initialization',
        hidden: true,
        component: () => import('@/views/settig/initialization'),
        name: 'initialization',
        meta: { title: '初始化设置' }
      },
      {
        path: 'log',
        hidden: true,
        component: () => import('@/views/settig/log'),
        name: 'log',
        meta: { title: '操作日志' }
      },

    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/site',
    name: 'explainSystem',
    hidden: true,
    children: [
      {
        path: '/site',
        hidden: true,
        component: () => import('@/views/site/index'),
        name: '',
        meta: { title: '系统简介' }
      }
    ]
  }
]
// 需要根据用户角色动态加载的路由
export const asyncRoutes = [
  ...routerList,

  // 404页面必须放在最后!!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
