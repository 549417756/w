import Layout from '@/layout'
export default {
  path: '/basics',
  component: Layout,
  redirect: '/basics/grade',
  name: 'Basics',
  sort: 2,
  meta: { title: '基础设置', icon: 'basic' },
  children: [
    {
      path: 'grade',
      component: () => import('@/views/basics/grade'),
      name: 'Grade',
      meta: { title: '年级设置' }
    },
    {
      path: 'subject',
      component: () => import('@/views/basics/subject'),
      name: 'Subject',
      meta: { title: '学科设置' }
    },
    {
      path: 'examination',
      component: () => import('@/views/basics/examination'),
      name: 'Examination ',
      meta: { title: '考试设置' }
    },
    {
      path: 'work-rest',
      component: () => import('@/views/basics/work-rest'),
      name: 'work-rest',
      meta: { title: '作息设置' }
    },
    {
      path: 'set-place',
      component: () => import('@/views/basics/set-place'),
      name: 'set-place',
      meta: { title: '场所管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/basics/role'),
      name: 'role',
      meta: { title: '角色管理' }
    },
    {
      path: 'permissions',
      component: () => import('@/views/basics/permissions'),
      name: 'permissions',
      meta: { title: '权限管理' }
    }
  ]
}
