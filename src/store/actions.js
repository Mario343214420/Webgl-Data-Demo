import {
  // reqOverviewData,
  reqUnionData,
  reqSummaryData,
  reqMapData,
  reqPublicData
} from '../api'
import {
  // Overview,
  Summary,
  Union,
  Public,
  Map
} from './mutation-types'

export default {
  /* async getOverview({ commit }) {
    const result = await reqOverviewData()
    commit(Overview, { result })
  }, */
  async getSummary({ commit }) {
    const result = await reqSummaryData()
    commit(Summary, { result })
  },
  async getUnion({ commit }) {
    const result = await reqUnionData()
    commit(Union, { result })
  },
  // async getPublic({ commit }) {
  //   const result = await reqPublicData()
  //   commit(Public, { result })
  // },
  async getMap({ commit }) {
    const result = await reqMapData()
    commit(Map, { result })
  }
}
