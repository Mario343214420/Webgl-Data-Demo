import { reqOverviewData, reqOverviewDataExchange, reqOverviewReport } from '../../api'
import { Overview, OverviewReport, OverviewDataExchange } from '../mutation-types'

export default {
  state: {
    union: {
      memoCount: 0,
      measureCount: 0,
      deptCount: 0,
      chartData: {
        inner: [
          { value: 1000, name: '惩戒' },
          { value: 2000, name: '激励' }
        ],
        outer: [
          { value: 400, name: '法人惩戒' },
          { value: 600, name: '自然人惩戒' },
          { value: 1400, name: '法人激励' },
          { value: 600, name: '自然人激励' }
        ]
      }
    }, // 联合奖惩
    dataExchange: {
      getIn: 0,
      getOut: 0,
      getInCorrect: '0%',
      getOutCorrect: '0%',
      dockedAbnormal: 0,
      dockedNormal: 0,
      chartData: [
        { product: '1月', 'collection': 100, 'output': 100 },
        { product: '2月', 'collection': 83.1, 'output': 73.4 },
        { product: '3月', 'collection': 86.4, 'output': 65.2 },
        { product: '4月', 'collection': 72.4, 'output': 53.9 },
        { product: '5月', 'collection': 72.4, 'output': 53.9 },
        { product: '6月', 'collection': 72.4, 'output': 53.9 },
        { product: '7月', 'collection': 72.4, 'output': 53.9 },
        { product: '8月', 'collection': 72.4, 'output': 53.9 },
        { product: '9月', 'collection': 72.4, 'output': 53.9 },
        { product: '10月', 'collection': 72.4, 'output': 53.9 },
        { product: '11月', 'collection': 72.4, 'output': 53.9 },
        { product: '12月', 'collection': 72.4, 'output': 53.9 }
      ]
    },
    total: [0,0,0,0,0,0,0,0],
    rotateData: [
      {name:'法人基础数量',value: 0},
      {name:'自然人基础数量',value: 0},
      {name:'法人信用信息',value: 0},
      {name:'自然人信用信息',value: 0},
      {name:'法人人均数量',value: 0},
      {name:'自然人人均数量',value: 0}
    ],
    redBlackList: {
      redList:{
        signCom: 0,
        taxpayer: 0,
        corp: 0,
        volunteer: 0
      },
      blackList: {
        performed: 0,
        case: 0,
        unpaid: 0,
        lose: 0
      }
    }, // 红黑名称
    collection: {
      lv1: 0,
      lv2: 0,
      resourceCount: 0,
      deptCount: 0,
      chartData: [
        ['product', '信息量'],
        ['基础信息', 80],
        ['业务信息', 100],
        ['司法信息', 20],
        ['行政执法信息', 300],
        ['公共事业信息', 400],
        ['信用评级信息', 500],
        ['其他信息', 600],
        ['累计', 700]
      ]
    }, // 部门数据归集统计
    report:{
      chartData:[
        { product: '1月', count: 1006 },
        { product: '2月', count: 1006 },
        { product: '3月', count: 1007 },
        { product: '4月', count: 1002 },
        { product: '5月', count: 1010 },
        { product: '6月', count: 1007 },
        { product: '7月', count: 1008 },
        { product: '8月', count: 1010 },
        { product: '9月', count: 1006 },
        { product: '10月', count: 1011 },
        { product: '11月', count: 1006 },
        { product: '12月', count: 1003 }
      ]
    },
    submission:[
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' }
    ]
  },
  getters: {

  },
  actions:{
    async getOverviewDataExchange({ commit }) {
      const result = await reqOverviewDataExchange()
      commit(OverviewDataExchange, { result })
    },
    async getOverviewReport({ commit }) {
      const result = await reqOverviewReport()
      commit(OverviewReport, { result })
    },
    async getOverview({ commit }) {
      const result = await reqOverviewData()
      commit(Overview, { result })
    },
  },
  mutations: {
    [Overview](state, { result }) {
      const {data} = result
      state.overview = data
    },
  }
}

