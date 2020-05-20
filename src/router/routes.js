import Home from '../pages/data/home/Home'
import Home2 from '../pages/data/home/Home2'
import Overview2 from '../pages/data/overview/Overview2'
import Overview from '../pages/data/overview/Overview'
import Summary from '../pages/data/summary/Summary.vue'
import Public from '../pages/data/public/Public.vue'

export const constantRouterMap = [
  {
    path: '/',
    component: Home,
    redirect: { name: 'Home' }
  },
  {
    path: '/',
    component: Home2,
    redirect: { name: 'Home2' }
  },
  {
    path: '/overview',
    component: Overview,
    redirect: { name: 'Overview' }
  },
  {
    path: '/overview2',
    component: Overview2,
    redirect: { name: 'Overview2' }
  },
  {
    path: '/summary',
    component: Summary,
    redirect: { name: 'Summary' }
  },
  {
    path: '/public',
    component: public,
    redirect: { name: 'Public' }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/401.vue')
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/403.vue')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/404.vue')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/500.vue')
  }
]

// 重新组织后导出
export default [
  ...constantRouterMap
]
