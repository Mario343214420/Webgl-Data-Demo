import { reqMapData } from '../../api'
import { Map } from '../mutation-types'

export default {
  state: {
    month: {
      collection:0,
      submit:0,
      reflux:0
    },
    classify:{
      lv1:0,
      lv2:0,
      resourceCount:0,
      deptCount: 0,
      chartData:[
        ['product', '辅助', '生活费'],
        ['基础信息', 0, 100],
        ['业务信息', 100, 100],
        ['司法信息', 200, 100],
        ['行政执法信息', 300, 100],
        ['公共事业信息', 400, 100],
        ['信用评级信息', 500, 100],
        ['其他信息', 600, 100],
        ['累计', 0, 700]
      ]
    },
    classifyList:[
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 }
    ],
    resource:{
      resourceCount: 0,
      dataCount:0,
      monthCount: 0
    },
    mapData:[
      [{
        name: '黑龙江',
        value: 1
      }], [{
        name: '北京市',
        value: 3
      }], [{
        name: '内蒙古',
        value: 1
      }], [{
        name: '吉林',
        value: 1
      }], [{
        name: '辽宁',
        value: 1
      }], [{
        name: '河北',
        value: 2
      }], [{
        name: '天津',
        value: 2
      }], [{
        name: '山西',
        value: 1
      }], [{
        name: '陕西',
        value: 1
      }], [{
        name: '甘肃',
        value: 1
      }], [{
        name: '宁夏',
        value: 1
      }], [{
        name: '青海',
        value: 1
      }], [{
        name: '新疆',
        value: 1
      }], [{
        name: '西藏',
        value: 1
      }], [{
        name: '四川',
        value: 2
      }], [{
        name: '重庆',
        value: 2
      }], [{
        name: '山东',
        value: 1
      }], [{
        name: '河南',
        value: 1
      }], [{
        name: '江苏',
        value: 2
      }], [{
        name: '安徽',
        value: 1
      }], [{
        name: '湖北',
        value: 2
      }], [{
        name: '浙江',
        value: 2
      }], [{
        name: '福建',
        value: 2
      }], [{
        name: '江西',
        value: 1
      }], [{
        name: '湖南',
        value: 2
      }], [{
        name: '贵州',
        value: 1
      }], [{
        name: '广西',
        value: 1
      }], [{
        name: '海南',
        value: 2
      }], [{
        name: '上海',
        value: 3
      }], [{
        name: '云南',
        value: 1
      }]
    ],
    sourceData: [
      { value: 10, name: '手工填报' },
      { value: 5, name: 'et对接' },
      { value: 15, name: '内部接口' },
      { value: 25, name: '其他' }
    ],
    naturalPersonData: {
      legalPerson:{
        inner: [
          { value: 335, name: '业务信息' },
          { value: 310, name: '司法信息' },
          { value: 234, name: '行政执法信息' },
          { value: 235, name: '信用评价信息' },
          { value: 248, name: '公共事业信息' },
          { value: 248, name: '其他信息' },
          { value: 248, name: '基本信息' }
        ],
        outer: [
          { value: 335, name: '直接访问' }
        ]
      },
      naturalPerson:{
        inner: [
          { value: 235, name: '业务信息' },
          { value: 210, name: '司法信息' },
          { value: 134, name: '行政执法信息' },
          { value: 135, name: '信用评价信息' },
          { value: 148, name: '公共事业信息' },
          { value: 148, name: '其他信息' },
          { value: 148, name: '基本信息' }
        ],
        outer: [
          { value: 235, name: '直接访问' }
        ]
      }
    },
    newestList: [
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 }
    ]
  },
  getters: {},
  actions: {
    // 初始
    async getMap({ commit }) {
      const result = await reqMapData()
      commit(Map, { result })
    },
  },
  mutations: {
    [Map](state, { result }) {
      const { data } = result
      for (let key in data) {
        state[key] = data[key]
      }
    }
  }
}
