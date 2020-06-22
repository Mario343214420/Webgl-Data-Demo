import { reqPublicData} from '../../api'
import { Public } from '../mutation-types'

export default {
  state: {
    newClassifyList: [
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 },
      { name: '部门名称一', count: 0, percent: 0 }
    ],
    weekSubmit: [
      ['product', '提报率'],
      ['1天', 100],
      ['2天', 100],
      ['3天', 200],
      ['4天', 300],
      ['5天', 400],
      ['6天', 500],
      ['7天', 600]
    ],
    gather: [
      ['product','行政许可','行政处罚'],
      ['1月',1000,500],
      ['2月',1400,600],
      ['3月',2000,700],
      ['4月',1500,500],
      ['5月',1200,400],
      ['6月',1300,500],
      ['7月',1400,600],
      ['8月',2000,500],
      ['9月',2200,300],
      ['10月',1600,500],
      ['11月',1700,600],
      ['12月',1400,400]
    ], // 双公示采集情况
    publicCounts: {
      naturalPersonPermit: 2,
      legalPersonPermit: 2,
      naturalPersonPunish: 2,
      legalPersonPunish: 2,
    },
    weekCase:{
      permit: 0,
      punish: 0
    },
    punishRepair: [
      ['product', '数量'],
      ['1月', 1006],
      ['2月', 1006],
      ['3月', 1007],
      ['4月', 1002],
      ['5月', 1010],
      ['6月', 1007],
      ['7月', 1008],
      ['8月', 1010],
      ['9月', 1006],
      ['10月', 1011],
      ['11月', 1006],
      ['12月', 1003]
    ],
    permitDistribute: {
      outer: [
        { value: 335, name: '业务信息' },
        { value: 310, name: '司法信息' },
        { value: 234, name: '行政执法信息' },
        { value: 235, name: '信用评价信息' },
        { value: 248, name: '公共事业信息' },
        { value: 248, name: '其他信息' },
        { value: 248, name: '基本信息' }
      ],
      inner: [
        { value: 335, name: '直接访问' }
      ]
    }
  }, // 部门双公示数据统计情况
  getters: {},
  actions: {
    // 交互
    /*async getOverviewDataExchange({ commit }, params) {
      const result = await reqOverviewDataExchange(params)
      commit(OverviewDataExchange, { result })
    },*/
    // 初始
    async getPublic({ commit }) {
      const result = await reqPublicData()
      commit(Public, { result })
    },
  },
  mutations: {
    [Public](state, { result }) {
      const { data } = result
      for ( let key in data){
        state[key] = data[key]
      }
    }
  }
}

