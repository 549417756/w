/* Layout */
import Layout from '@/layout'

export default {
  path: '/device',
  component: Layout,
  redirect: '/device/info',
  name: 'Device',
  sort: 6,
  meta: { title: '设备管理', icon: 'device' },
  children: [
    {
      path: 'info',
      component: () => import('@/views/device/info'),
      name: 'Info',
      meta: { title: '校牌信息' }
    },
    {
      path: 'base',
      component: () => import('@/views/device/base'),
      name: 'base',
      meta: { title: '基站信息' }
    }
  ]
}
