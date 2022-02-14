import Home from '../pages/Home/index.vue'
import Loading from '../pages/Loading/index.vue'
import Channel1 from '../pages/Channel1/index.vue'
import Channel2 from '../pages/Channel2/index.vue'
import Channel3 from '../pages/Channel3/index.vue'
import Channel4 from '../pages/Channel4/index.vue'
import Channel5 from '../pages/Channel5/index.vue'
import Channel6 from '../pages/Channel6/index.vue'
import Channel7 from '../pages/Channel7/index.vue'
import Channel8 from '../pages/Channel8/index.vue'
import Channel8WeiYuan from '../pages/Channel8WeiYuan/index.vue'
import Channel9 from '../pages/Channel9/index.vue'
import Channel10 from '../pages/Channel10/index.vue'
import Channel11 from '../pages/Channel11/index.vue'
import Channel12 from '../pages/Channel12/index.vue'
import Channel13 from '../pages/Channel13/index.vue'
import Channel14 from '../pages/Channel14/index.vue'
import Channel15 from '../pages/Channel15/index.vue'
import Channel16 from '../pages/Channel16/index.vue'
import Channel17 from '../pages/Channel17/index.vue'
import Channel18 from '../pages/Channel18/index.vue'
import Channel19 from '../pages/Channel19/index.vue'
import ChannelRepair from '../pages/Channel_repair_model/index.vue'

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
      title: '精简网格加速景场+动态模型添加'
    }
  },
  {
    path: '/channel8-weiyuan',
    component: Channel8WeiYuan,
    meta: {
      title: '威远井场'
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
    path: '/channel15',
    component: Channel15,
    meta: {
      title: '数字建筑'
    }
  },
  {
    path: '/channel16',
    component: Channel16,
    meta: {
      title: '数字建筑叠加shader'
    }
  },
  {
    path: '/channel17',
    component: Channel17,
    meta: {
      title: '测试模型对接'
    }
  },
  {
    path: '/channel18',
    component: Channel18,
    meta: {
      title: '测试模型对接'
    }
  },
  {
    path: '/channel19',
    component: Channel19,
    meta: {
      title: '天玛'
    }
  },
  {
    path: '/channel_repair',
    component: ChannelRepair,
    meta: {
      title: '模型精修'
    }
  },
  {
    path: '/loading',
    component: Loading,
    meta: {
      title: '官网背景特效'
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
