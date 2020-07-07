import Home from '../pages/data/home/Home'
import Overview from '../pages/data/overview/Overview'
import Summary from '../pages/data/summary/Summary.vue'
import Public from '../pages/data/public/Public.vue'
import Union from '../pages/data/union/Union.vue'
import Map from '../pages/data/map/Map.vue'

export const constantRouterMap = [
  {
    path: '/',
    component: Home,
    redirect: { name: 'Home' }
  },
  {
    path: '/overview',
    component: Overview,
    redirect: { name: 'Overview' }
  },
  {
    path: '/summary',
    component: Summary,
    redirect: { name: 'Summary' }
  },
  {
    path: '/public',
    component: Public,
    redirect: { name: 'Public' }
  },
  {
    path: '/union',
    component: Union,
    redirect: { name: 'Union' }
  },
  {
    path: '/map',
    component: Map,
    redirect: { name: 'Map' }
  }
]

// 重新组织后导出
export default [
  ...constantRouterMap
]
