/* vuex的核心管理对象 */
import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'
import overview from './modules/overview'

Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  // mutations,
  // actions,
  // getters,
  modules: {
    overview
  }
})
