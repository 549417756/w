import Layout from '@/layout'
export default {
  path: '/organiza',
  component: Layout,
  redirect: '/organiza/department',
  name: 'Organiza',
  sort: 3,
  meta: { title: '组织管理', icon: 'organiza' },
  children: [
    {
      path: 'department',
      component: () => import('@/views/organiza/department'),
      name: 'Department',
      meta: { title: '部门管理' }
    },
    {
      path: 'staff',
      component: () => import('@/views/organiza/staff'),
      name: 'Staff',
      meta: { title: '员工管理' }
    }
  ]
}
