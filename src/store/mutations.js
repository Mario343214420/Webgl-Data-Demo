import {
  Map,
  Union,
  Summary,
  Public
} from './mutation-types'

export default {
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
