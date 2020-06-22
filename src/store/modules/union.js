export default {
  state: {
    unionRewardPunish: {
      total: 0,
      memo:0,
      dept: 0,
      naturalPerson: {
        total: 0,
        reward: 0,
        punish: 0
      },
      legalPerson: {
        total: 0,
        reward: 0,
        punish: 0
      }
    },
    redBlackStatistics: {
      red: {
        total: 0,
        approve: 0,
        taxpayer: 0,
        honor: 0,
        excellent: 0
      },
      black: {
        total: 0,
        approve: 0,
        taxpayer: 0,
        honor: 0,
        excellent: 0
      }
    },
    trend: [
      ['product','惩戒','激励'],
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
    ],
    query: [
      ['product', '次数'],
      ['部门1',1000],
      ['部门2',900],
      ['部门3',800],
      ['部门4',700],
      ['部门5',600],
      ['部门6',500],
      ['部门7',400],
      ['部门8',300],
    ],
    feedback: [
      ['product', '次数'],
      ['部门1',1000],
      ['部门2',900],
      ['部门3',800],
      ['部门4',700],
      ['部门5',600],
      ['部门6',500],
      ['部门7',400],
      ['部门8',300],
    ],
    memoTrend: [],
    memoStatusList: [],
    punishRewardList: [],
    measure: [],
    quitTrend: []
  },
  getters: {},
  actions: {},
  mutations: {}
}
