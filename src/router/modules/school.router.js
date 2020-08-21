/* Layout */
import Layout from '@/layout'

export default {
  path: '/school',
  component: Layout,
  redirect: '/school/school',
  name: 'School',
  sort: 1,
  meta: { title: '学校管理', icon: 'school' },
  children: [
    {
      path: 'school',
      component: () => import('@/views/school/index'),
      name: 'school',
      meta: { title: '学校管理' }
    }
  ]
}
