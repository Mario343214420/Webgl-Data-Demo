import {
  reqOverviewData
} from '../api'
import {
  Overview
} from './mutation-types'

export default { async getOverview({ commit }) {
    const result = await reqOverviewData()
    commit(Overview, { result })
  }
}
