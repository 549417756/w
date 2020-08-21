/* Layout */
import Layout from '@/layout'

export default {
  path: '/message',
  component: Layout,
  redirect: '/message/classify',
  name: 'Message',
  sort: 7,
  meta: { title: '消息管理', icon: 'message' },
  children: [
    {
      path: 'classify',
      component: () => import('@/views/message/classify'),
      name: 'MessageClassify',
      meta: { title: '消息分类' }
    },
    {
      path: 'list',
      component: () => import('@/views/message/list'),
      name: 'MessageList',
      meta: { title: '消息列表' }
    },
    {
      path: 'list/create',
      component: () => import('@/views/message/detail'),
      name: 'MessageCreate',
      meta: { title: '消息新增', activeMenu: '/message/list' },
      hidden: true
    },
    {
      path: 'list/edit/:id',
      component: () => import('@/views/message/detail'),
      name: 'MessageEdit',
      meta: { title: '消息编辑', activeMenu: '/message/list' },
      hidden: true
    }
  ]
}
