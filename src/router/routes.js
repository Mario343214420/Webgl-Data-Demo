import Home from '../pages/Home/index.vue'
import Channel1 from '../pages/Channel1/index.vue'
import Channel2 from '../pages/Channel2/index.vue'
import Channel3 from '../pages/Channel3/index.vue'
import Channel4 from '../pages/Channel4/index.vue'
import Channel5 from '../pages/Channel5/index.vue'

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/channel1',
    component: Channel1
  },
  {
    path: '/channel2',
    component: Channel2
  },
  {
    path: '/channel3',
    component: Channel3
  },
  {
    path: '/channel4',
    component: Channel4
  },
  {
    path: '/channel5',
    component: Channel5
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
