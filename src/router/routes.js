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
import Channel_homepage from '../pages/Channel_homepage/index.vue'
import Sulige_0822 from '../pages/Channel_sulige0822/index.vue'
import Sulige_0822_0829 from '../pages/Channel_sulige0829_22/index.vue'
import Sulige_0829 from '../pages/Channel_sulige0829_compare/index.vue'
import Sulige_0902 from '../pages/Channel_sulige0902_compare/index.vue'
import Sulige_0902_Just_Model from '../pages/Channel_sulige0902_compare/index_just_for_9.2_model.vue'
import Sulige_0906 from '../pages/Channel_sulige_0906_repaire/index.vue'
import Sulige_0908 from '../pages/Channel_sulige_0908_repaire/index.vue'
import Sulige_0913 from '../pages/Channel_sulige_0913_repaire/index.vue'
import Sulige_0919 from '../pages/Channel_sulige_0919/index.vue'
import Sulige_1017 from '../pages/Channel_sulige_1017/index.vue'
import Sulige_1021 from '../pages/Channel_sulige_1021/index.vue'
import Sulige_1021_final from '../pages/Channel_sulige_1021/index_final.vue'
import Sulige_0901_1018 from '../pages/Channel_sulige_1021/index_0901_1018.vue'
import Channel_three_curve from '../pages/Channel_three_secret_fun/curve.vue'
import Channel_three_plane_angle from '../pages/Channel_three_secret_fun/plane_angle.vue'
import WellSite from '../pages/WellSite/index.vue'
import Channel_camera_animate from '../pages/Channel_camera_animate/index.vue'
import Channel_kuangqu from '../pages/Channel_kuangqu/index.vue'
import Channel_cube from '../pages/Channel_cube/index.vue'
import Channel_fall_star from '../pages/Channel_fall_star'
import Channel_nebula from '../pages/Channel_nebula'

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
      title: 'Sulige井场'
    }
  },
  {
    path: '/channel8_sulige_pipe',
    component: Channel8_sulige_pipe,
    meta: {
      title: 'Sulige地下管路'
    }
  },
  {
    path: '/channel8-sulige_part_control',
    component: Channel8_sulige_part_control,
    meta: {
      title: 'Sulige瓦片万向控制'
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
      title: 'TM'
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
      title: 'TM动态数据接口'
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
      title: '4月28日Sulige'
    }
  },
  {
    path: '/sulige_zongheng',
    component: ChannelSuligeZongHeng,
    meta: {
      title: 'Sulige纵横'
    }
  },
  {
    path: '/sulige_zongheng_output_gps',
    component: ChannelSuligeZongHengOutPutGps,
    meta: {
      title: 'Sulige纵横--直出GPS'
    }
  },
  {
    path: '/sulige_zongheng_0617',
    component: ChannelSuligeZongHeng0617,
    meta: {
      title: 'Sulige纵横--GPS偏离度'
    }
  },
  {
    path: '/sulige_zongheng0531',
    component: ChannelSuligeZongHeng0531,
    meta: {
      title: 'Sulige纵横5月31日存档'
    }
  },
  {
    path: '/sulige_zongheng0607',
    component: ChannelSuligeZongHengGpsCompare,
    meta: {
      title: 'Sulige纵横6月7日 点距测量'
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
    path: '/well_site',
    component: WellSite,
    meta: {
      title: '井队数字化'
    }
  },
  {
    path: '/0822',
    component: Sulige_0822,
    meta: {
      title: '0822初次'
    }
  },
  {
    path: '/0822_',
    component: Sulige_0822_0829,
    meta: {
      title: '0822初次 减量'
    }
  },
  {
    path: '/0829',
    component: Sulige_0829,
    meta: {
      title: '0829 模型对比'
    }
  },
  {
    path: '/0902',
    component: Sulige_0902,
    meta: {
      title: '0902 管线投影'
    }
  },
  {
    path: '/0902_just_model',
    component: Sulige_0902_Just_Model,
    meta: {
      title: '0902 纯模型查验'
    }
  },
  {
    path: '/0906',
    component: Sulige_0906,
    meta: {
      title: '0906 确定坐标轴'
    }
  },
  {
    path: '/0908',
    component: Sulige_0908,
    meta: {
      title: '0908 确定坐标轴'
    }
  },
  {
    path: '/0913',
    component: Sulige_0913,
    meta: {
      title: '0913 地形对准'
    }
  },
  {
    path: '/0919',
    component: Sulige_0919,
    meta: {
      title: '0919 地形对准'
    }
  },
  {
    path: '/1017',
    component: Sulige_1017,
    meta: {
      title: '1017'
    }
  },
  {
    path: '/1021',
    component: Sulige_1021,
    meta: {
      title: '1021 测量'
    }
  },
  {
    path: '/1021_f',
    component: Sulige_1021_final,
    meta: {
      title: '1021 最终版'
    }
  },
  {
    path: '/0901_compare_with_1018',
    component: Sulige_0901_1018,
    meta: {
      title: '0901对比1018'
    }
  },
  {
    path: '/channel_three_curve',
    component: Channel_three_curve,
    meta: {
      title: 'three曲线'
    }
  },
  {
    path: '/channel_three_plane_angle',
    component: Channel_three_plane_angle,
    meta: {
      title: 'three面与向量夹角'
    }
  },
  {
    path: '/homepage',
    component: Channel_homepage,
    meta: {
      title: '页面样例'
    }
  },
  {
    path: '/camera_animate',
    component: Channel_camera_animate,
    meta: {
      title: '镜头动画'
    }
  },
  {
    path: '/hami_kuangqu',
    component: Channel_kuangqu,
    meta: {
      title: '哈密矿区模型'
    }
  },
  {
    path: '/cube',
    component: Channel_cube,
    meta: {
      title: '双层地形'
    }
  },
  {
    path: '/fallStar',
    component: Channel_fall_star,
    meta: {
      title: '流星'
    }
  },
  {
    path: '/nebula',
    component: Channel_nebula,
    meta: {
      title: '星云'
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
