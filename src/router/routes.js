import Home from '../pages/Home/index.vue'
import MineScene from '../pages/MineScene/index.vue'
import DataCloud from '../pages/DataCloud/index.vue'

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/MineScene',
    component: MineScene
  },
  {
    path: '/DataCloud',
    component: DataCloud
  },
  {
    path: '/',
    redirect: '/home'
  }
]

// 重新组织后导出
export default [
  ...routes
]
