import {
  Overview,
  Map,
  Union,
  Summary,
  Public
} from './mutation-types'

export default {
  [Overview](state, { result }) {
    const {data} = result
    state.overview = data
  },
  [Map](state, { result }) {
    const {map} = result
    state.map = map
  },
  [Union](state, { result }) {
    const {union} = result
    state.union = union
  },
  [Summary](state, { result }) {
    const {summary} = result
    state.summary = summary
  },
  [Public](state, { result }) {
    const {publicState} = result
    state.public = publicState
  }
}
