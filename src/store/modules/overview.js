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
        ['product', '归集', '输出'],
        ['1月', 100, 100],
        ['2月', 83.1, 73.4],
        ['3月', 86.4, 65.2],
        ['4月', 72.4, 53.9],
        ['5月', 72.4, 53.9],
        ['6月', 72.4, 53.9],
        ['7月', 72.4, 53.9],
        ['8月', 72.4, 53.9],
        ['9月', 72.4, 53.9],
        ['10月', 72.4, 53.9],
        ['11月', 72.4, 53.9],
        ['12月', 72.4, 53.9]
      ]
    },
    total: [0, 1, 0, 1, 0, 1, 0, 0],
    rotateData: [
      { name: '法人基础数量', value: 0 },
      { name: '自然人基础数量', value: 0 },
      { name: '法人信用信息', value: 0 },
      { name: '自然人信用信息', value: 0 },
      { name: '法人人均数量', value: 0 },
      { name: '自然人人均数量', value: 0 }
    ],
    redBlackList: {
      redList: {
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
    report: {
      chartData: [
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
      ]
    },
    submission: [
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' }
    ]
  },
  getters: {},
  actions: {
    // 交互
    async getOverviewDataExchange({ commit }, params) {
      const result = await reqOverviewDataExchange(params)
      commit(OverviewDataExchange, { result })
    },
    async getOverviewReport({ commit }, params) {
      const result = await reqOverviewReport(params)
      commit(OverviewReport, { result })
    },
    // 初始
    async getOverview({ commit }) {
      const result = await reqOverviewData()
      commit(Overview, { result })
    },
  },
  mutations: {
    [Overview](state, { result }) {
      const { data } = result
      for ( let key in data){
        state[key] = data[key]
      }
    },
    [OverviewReport](state, { result }) {
      const { data } = result
      state.report = data
    },
    [OverviewDataExchange](state, { result }) {
      const { data } = result
      state.dataExchange = data
    }
  }
}

