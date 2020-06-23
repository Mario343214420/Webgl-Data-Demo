import { reqUnionData } from '../../api'
import { Union } from '../mutation-types'

export default {
  state: {
    unionRewardPunish: {
      total: 0,
      memo: 0,
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
      ['product', '惩戒', '激励'],
      ['1月', 1000, 500],
      ['2月', 1400, 600],
      ['3月', 2000, 700],
      ['4月', 1500, 500],
      ['5月', 1200, 400],
      ['6月', 1300, 500],
      ['7月', 1400, 600],
      ['8月', 2000, 500],
      ['9月', 2200, 300],
      ['10月', 1600, 500],
      ['11月', 1700, 600],
      ['12月', 1400, 400]
    ],
    query: [
      ['product', '次数'],
      ['部门1', 1000],
      ['部门2', 900],
      ['部门3', 800],
      ['部门4', 700],
      ['部门5', 600],
      ['部门6', 500],
      ['部门7', 400],
      ['部门8', 300],
    ],
    feedback: [
      ['product', '次数'],
      ['部门1', 1000],
      ['部门2', 900],
      ['部门3', 800],
      ['部门4', 700],
      ['部门5', 600],
      ['部门6', 500],
      ['部门7', 400],
      ['部门8', 300],
    ],
    memoTrend: [
      ['product','趋势'],
      ['10:00',35],
      ['10:30',50],
      ['11:00',52],
      ['11:30',55],
      ['12:00',60],
      ['12:30',56],
      ['13:00',50],
      ['13:30',51],
      ['14:00',54],
      ['14:30',57],
      ['15:00',60],
      ['15:30',70]
    ],
    memoStatusList: [
      { name: '房产交易', count: 8848, time: 9527 },
      { name: '规划设计方案', count: 8848, time: 9527 },
      { name: '股票交易', count: 8848, time: 9527 },
      { name: '不动产转移', count: 8848, time: 9527 }
    ],
    punishRewardList: [
      { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
      { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' }
    ],
    measure: [],
    quitTrend: []
  },
  getters: {},
  actions: {
    // 初始
    async getUnion({ commit }) {
      const result = await reqUnionData()
      commit(Union, { result })
    },
  },
  mutations: {
    [Union](state, { result }) {
      const { data } = result
      for (let key in data) {
        state[key] = data[key]
      }
    }
  }
}
