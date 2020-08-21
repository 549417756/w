/* Layout */
import Layout from '@/layout'

export default {
  path: '/content',
  component: Layout,
  redirect: '/content/classify',
  name: 'Content',
  sort: 10,
  meta: { title: '内容推送', icon: 'content' },
  children: [
    {
      path: 'classify',
      component: () => import('@/views/content/classify'),
      name: 'ContentClassify',
      meta: { title: '推送分类' }
    },
    {
      path: 'info',
      component: () => import('@/views/content/info'),
      name: 'ContentInfo',
      meta: { title: '内容信息' }
    },
    {
      path: 'info/create',
      component: () => import('@/views/content/detail'),
      name: 'InfoCreate',
      meta: { title: '内容新增', activeMenu: '/content/info' },
      hidden: true
    },
    {
      path: 'info/edit/:id',
      component: () => import('@/views/content/detail'),
      name: 'InfoEdit',
      meta: { title: '内容编辑', activeMenu: '/content/info' },
      hidden: true
    },
    {
      path: 'record',
      component: () => import('@/views/content/record'),
      name: 'ContentRecord',
      meta: { title: '推送记录' }
    }
  ]
}
