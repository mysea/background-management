import Layout from '@/views/layout/backgroundLayout'

const backgroundRouter = {
  path: '/background',
  component: Layout,
  name: 'background',
  meta: {
    index: 0,
    icon: 'background',
    title: '后台管理'
  },
  children: [
    {
      name: 'website',
      path: 'website',
      component: () => import('@/views/background/website/index'),
      meta: {
        index: 1,
        icon: 'website',
        title: '站点管理',
        requiresAuth: true
      }
    },
    {
      name: 'module',
      path: 'module',
      component: () => import('@/views/background/module/index'),
      meta: {
        index: 1,
        icon: 'module',
        title: '模块管理',
        requiresAuth: true
      }
    },
    {
      name: 'role',
      path: 'role',
      component: () => import('@/views/background/role/index'),
      meta: {
        index: 1,
        icon: 'role',
        title: '角色管理',
        requiresAuth: true
      }
    },
    {
      name: 'user',
      path: 'user',
      component: () => import('@/views/background/user/index'),
      meta: {
        index: 1,
        icon: 'user',
        title: '用户管理',
        requiresAuth: true
      }
    },
    {
      name: 'dictionary',
      path: 'dictionary',
      component: () => import('@/views/background/dictionary/index'),
      meta: {
        index: 1,
        icon: 'dictionary',
        title: '字典管理',
        requiresAuth: true
      }
    },
    {
      name: 'locale',
      path: 'locale',
      component: () => import('@/views/background/locale/index'),
      meta: {
        index: 1,
        icon: 'locale',
        title: '全球化',
        requiresAuth: true
      }
    },
    {
      name: 'log',
      path: 'log',
      component: () => import('@/views/background/log/index'),
      meta: {
        index: 1,
        icon: 'log',
        title: '日志管理',
        requiresAuth: true
      }
    }
  ]
}

export default backgroundRouter
