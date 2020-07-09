import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mock
import './mock/mockServer'
import * as THREE from 'three'
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader'
import * as ThreeStats from 'three-stats'
//性能监听
import * as OrbitControls from 'three/examples/jsm/controls/OrbitControls'
import * as TrackballControls from 'three/examples/jsm/controls/TrackballControls'
//轨道控制
Vue.config.productionTip = false
Vue.prototype.THREE = THREE
Vue.prototype.TrackballControls = TrackballControls

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
