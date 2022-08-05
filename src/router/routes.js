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
import Channel8SuLiGe from '../pages/Channel8SuLiGe/index.vue'
import Channel8_sulige_pipe from '../pages/Channel8_sulige_pipe/index.vue'
import Channel8_sulige_part_control from '../pages/Channel8_sulige_part_control/index.vue'
import Sulige_0428 from '../pages/Channel_SuLiGe_0428/index.vue'
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
import ChannelPipeCompare from '../pages/Channel_pipe_compare/index.vue'
import CoalCube from '../pages/Coal_cube/index.vue'
import ChannelZongcaimian from '../pages/Channel_zongcaimian/index.vue'
import ChannelSuligeZongHeng from '../pages/Channel_SuLiGe_zongheng/index.vue'
import ChannelSuligeZongHengOutPutGps from '../pages/Channel_SuLiGe_zongheng/index_output_gps.vue'
import ChannelSuligeZongHeng0617 from '../pages/Channel_SuLiGe_zongheng/index_0617_2.vue'
import ChannelSuligeZongHeng0531 from '../pages/Channel_SuLiGe_zongheng/index_0531.vue'
import ChannelSuligeZongHengGpsCompare from '../pages/Channel_SuLiGe_zongheng/index_0607_gps_compare.vue'
import FangPenQi from '../pages/Channel_fangpenqi/index.vue'
import Spotlight from '../pages/Channel_spotlight_shadow/index.vue'
import EdgeGeometry from '../pages/Channel_EdgesGeometry/index.vue'
import Channel_CanvasIsPointIn from '../pages/Channel_CanvasIsPointIn/index.vue'

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
    component: Channel3,
    meta: {
      title: '星光地球'
    }
  },
  {
    path: '/channel4',
    component: Channel4,
    meta: {
      title: '龙女模型'
    }
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
    path: '/channel8-sulige',
    component: Channel8SuLiGe,
    meta: {
      title: '苏里格井场'
    }
  },
  {
    path: '/channel8_sulige_pipe',
    component: Channel8_sulige_pipe,
    meta: {
      title: '苏里格地下管路'
    }
  },
  {
    path: '/channel8-sulige_part_control',
    component: Channel8_sulige_part_control,
    meta: {
      title: '苏里格瓦片万向控制'
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
    path: '/channel_pipe_compare',
    component: ChannelPipeCompare,
    meta: {
      title: '埋管覆土层对比'
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
    path: '/coal',
    component: CoalCube,
    meta: {
      title: '天玛动态数据接口'
    }
  },
  {
    path: '/zongcaimian',
    component: ChannelZongcaimian,
    meta: {
      title: '综采面'
    }
  },
  {
    path: '/fangpenqi',
    component: FangPenQi,
    meta: {
      title: '防喷器'
    }
  },
  {
    path: '/spotlight',
    component: Spotlight,
    meta: {
      title: '点光源'
    }
  },
  {
    path: '/sulige_0428',
    component: Sulige_0428,
    meta: {
      title: '4月28日苏里格'
    }
  },
  {
    path: '/sulige_zongheng',
    component: ChannelSuligeZongHeng,
    meta: {
      title: '苏里格纵横'
    }
  },
  {
    path: '/sulige_zongheng_output_gps',
    component: ChannelSuligeZongHengOutPutGps,
    meta: {
      title: '苏里格纵横--直出GPS'
    }
  },
  {
    path: '/sulige_zongheng_0617',
    component: ChannelSuligeZongHeng0617,
    meta: {
      title: '苏里格纵横--GPS偏离度'
    }
  },
  {
    path: '/sulige_zongheng0531',
    component: ChannelSuligeZongHeng0531,
    meta: {
      title: '苏里格纵横5月31日存档'
    }
  },
  {
    path: '/sulige_zongheng0607',
    component: ChannelSuligeZongHengGpsCompare,
    meta: {
      title: '苏里格纵横6月7日 点距测量'
    }
  },
  {
    path: '/edgeGeometry',
    component: EdgeGeometry,
    meta: {
      title: '边缘几何体'
    }
  },
  {
    path: '/canvas_is_point_in',
    component: Channel_CanvasIsPointIn,
    meta: {
      title: 'canvas判断是否在区域内（或路径内）'
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
