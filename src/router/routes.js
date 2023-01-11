import Home from '../pages/Home/index.vue'

const routes = [
  {
    path: '/home',
    component: Home
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
