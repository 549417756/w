/* Layout */
import Layout from '@/layout'

export default {
  path: '/forum',
  component: Layout,
  redirect: '/forum/topic-classify',
  name: 'Forum',
  sort: 9,
  meta: { title: '论坛话题管理', icon: 'forum' },
  children: [
    {
      path: 'topic-classify',
      component: () => import('@/views/forum/topic-classify'),
      name: 'Classify',
      meta: { title: '话题分类' }
    },
    {
      path: 'topic-list',
      component: () => import('@/views/forum/topic-list'),
      name: 'List',
      meta: { title: '话题列表' }
    },
    {
      path: 'topic-details/:id',
      component: () => import('@/views/forum/topic-details'),
      name: 'EditArticle',
      meta: { title: '话题详情', activeMenu: '/forum/topic-list' },
      hidden: true
    },
    {
      path: 'report-manage',
      component: () => import('@/views/forum/report-manage'),
      name: 'PushRecord',
      meta: { title: '举报管理' }
    },
    {
      path: 'report-details/:id',
      component: () => import('@/views/forum/report-details'),
      name: 'ReportDetails',
      meta: { title: '举报详情', activeMenu: '/forum/report-manage' },
      hidden: true
    }
  ]
}
