import { reqSummaryData} from '../../api'
import { Summary } from '../mutation-types'

export default {
  state: {
    monthAnalysis: {
      collection: 100,
      appear: 200,
      reflux: 300
    }, // 本月数据分析
    classifyStatistic:{
      lv1:0,
      lv2:0,
      resourceCount:0,
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
      ],
      deptList: [
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 }
      ]
    }, // 分类统计
    summaryCounts: {
      resource: 0,
      collection: 0,
      month: 0,
      naturalPerson: 0,
      legalPerson: 0,
      focusPerson: 0,
      passPercent: 80,
      chartList: [
        ['product','奖','惩'],
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
        ['12月',1400,400],
      ]
    }, // 中心数据
    source:[
      ['product','数据来源'],
      ['手工填报',10],
      ['et对接',5],
      ['内部接口',15],
      ['其他',25]
    ], // 来源
    naturalPersonAnalysis: [
      {
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
          { value: 535, name: '直接访问' }
        ]
      },
      {
        outer: [
          { value: 365, name: '业务信息' },
          { value: 340, name: '司法信息' },
          { value: 264, name: '行政执法信息' },
          { value: 225, name: '信用评价信息' },
          { value: 218, name: '公共事业信息' },
          { value: 228, name: '其他信息' },
          { value: 218, name: '基本信息' }
        ],
        inner: [
          { value: 635, name: '直接访问' }
        ]
      }
    ],
    /*[
      ['product','分类'],
      ['基本信息',2365466],
      ['业务信息',5466],
      ['司法信息',5638],
      ['行政执法信息',3256],
      ['信用评价信息',3256],
      ['公共事业信息',5456],
      ['其他信息',5456]
    ], */
    // 自然人资源数据分类数据分析
    newestFillInDept: [
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 },
      { name: '部门名称一', count: 8848, percent: 10 }
    ] // 最新填报部门
  },
  getters: {},
  actions: {
    // 交互
    /*async getOverviewDataExchange({ commit }, params) {
      const result = await reqOverviewDataExchange(params)
      commit(OverviewDataExchange, { result })
    },*/
    // 初始
    async getSummary({ commit }) {
      const result = await reqSummaryData()
      commit(Summary, { result })
    },
  },
  mutations: {
    [Summary](state, { result }) {
      const { data } = result
      for ( let key in data){
        state[key] = data[key]
      }
    }
  }
}

