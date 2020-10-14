import {
  Overview
} from './mutation-types'

export default {
  [Overview](state, { result }) {
    const { overview } = result
    state.overview = overview
  }
}
