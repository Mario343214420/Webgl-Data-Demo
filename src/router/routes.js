import Home from '../pages/Home/index.vue'
import Channel1 from '../pages/Channel1/index.vue'
import Channel2 from '../pages/Channel2/index.vue'
import Channel3 from '../pages/Channel3/index.vue'
import Channel4 from '../pages/Channel4/index.vue'
import Channel5 from '../pages/Channel5/index.vue'
import Channel6 from '../pages/Channel6/index.vue'
import Channel7 from '../pages/Channel7/index.vue'
import Channel8 from '../pages/Channel8/index.vue'
import Channel9 from '../pages/Channel9/index.vue'
import Channel10 from '../pages/Channel10/index.vue'
import Channel11 from '../pages/Channel11/index.vue'
import Channel12 from '../pages/Channel12/index.vue'
import Channel13 from '../pages/Channel13/index.vue'
import Channel14 from '../pages/Channel14/index.vue'

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
    path: '/channel6',
    component: Channel6
  },
  {
    path: '/channel7',
    component: Channel7
  },
  {
    path: '/channel8',
    component: Channel8,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel9',
    component: Channel9,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel10',
    component: Channel10,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel11',
    component: Channel11,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel12',
    component: Channel12,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel13',
    component: Channel13,
    meta: {
      title: '航拍景场监控'
    }
  },
  {
    path: '/channel14',
    component: Channel14,
    meta: {
      title: '航拍景场监控'
    }
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
