/*vuex的核心管理对象*/
import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'
import overview from './modules/overview'
import summary from './modules/summary'
import publicModule from './modules/public'
import union from './modules/union'
import map from './modules/map'
// import home from './module/home'
// import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  // mutations,
  // actions,
  // getters,
  modules:{
    overview,
    summary,
    publicModule,
    union,
    map
  },
})
