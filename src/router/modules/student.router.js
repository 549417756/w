import Layout from '@/layout'
export default {
  path: '/student',
  component: Layout,
  redirect: '/student/student-Info',
  name: 'Student',
  sort: 4,
  meta: { title: '学生管理', icon: 'student' },
  children: [
    {
      path: 'student-Info',
      component: () => import('@/views/student/student-Info'),
      name: 'student-Info',
      meta: { title: '学生信息' }
    },
    {
      path: 'student-fraction',
      component: () => import('@/views/student/student-fraction'),
      name: 'student-fraction',
      meta: { title: '学生成绩' }
    },
    {
      path: 'personal-Info/:id',
      component: () => import('@/views/student/personal-Info'),
      name: 'personal-Info',
      meta: { title: '详情' },
      hidden: true
    }
  ]
}
