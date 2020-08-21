/* Layout */
import Layout from '@/layout'

export default {
  path: '/app',
  component: Layout,
  redirect: '/app/feedback',
  name: 'App',
  sort: 13,
  meta: { title: 'APP管理', icon: 'app' },
  children: [
    {
      path: 'feedback',
      component: () => import('@/views/app/feedback'),
      name: 'Callback',
      meta: { title: '反馈管理' }
    },
    {
      path: 'slide',
      component: () => import('@/views/app/slide'),
      name: 'Slide',
      meta: { title: '轮播图管理' }
    }
  ]
}
