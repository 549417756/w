/* Layout */
import Layout from '@/layout'

export default {
  path: '/audit',
  component: Layout,
  redirect: '/audit/withdrawal',
  name: 'Audit',
  sort: 11,
  meta: { title: '审核管理', icon: 'audit' },
  children: [
    {
      path: 'withdrawal',
      component: () => import('@/views/audit/withdrawal'),
      name: 'Withdrawal',
      meta: { title: '提现审核' }
    }
  ]
}
