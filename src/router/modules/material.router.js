/* Layout */
import Layout from '@/layout'

export default {
  path: '/material',
  component: Layout,
  redirect: '/material/eaxm',
  name: 'Material',
  sort: 5,
  meta: { title: '教程管理', icon: 'material' },
  children: [
    {
      path: 'eaxm',
      component: () => import('@/views/material/eaxm-course'),
      name: 'Exam',
      meta: { title: '素材上传' }
    },
    {
      path: 'income',
      component: () => import('@/views/material/income'),
      name: 'Income',
      meta: { title: '订单管理' }
    }
  ]
}
