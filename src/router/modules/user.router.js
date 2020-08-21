
/* Layout */
import Layout from '@/layout'
export default {

  path: '/user',
  component: Layout,
  redirect: '/user/info',
  name: 'User',
  sort: 12,
  meta: { title: '个人中心', icon: 'user' },
  children: [
    {
      path: 'info',
      component: () => import('@/views/user/info'),
      name: 'UserInfo',
      meta: { title: '基本信息' }
    },
    {
      path: 'income',
      component: () => import('@/views/user/income'),
      name: 'UserMoney',
      meta: { title: '收入详情' }
    }
  ]
}
