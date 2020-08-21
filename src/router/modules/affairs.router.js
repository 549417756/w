/* Layout */
import Layout from '@/layout'

export default {
  path: '/affairs',
  component: Layout,
  redirect: '/affairs/course',
  name: 'Affairs',
  sort: 8,
  meta: { title: '教务管理', icon: 'affairs' },
  children: [
    {
      path: 'course',
      component: () => import('@/views/affairs/course'),
      name: 'Course',
      meta: { title: '课程表设置' }
    },
    {
      path: 'homework',
      component: () => import('@/views/affairs/homework'),
      name: 'Homework',
      meta: { title: '作业发布' }
    }
  ]
}
