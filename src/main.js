import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mock
import './mock/mockServer'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import {graphic} from 'echarts'
const {LinearGradient} = graphic
import 'echarts/map/js/china'
Vue.prototype.$LinearGradient = LinearGradient
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.min.css' // （css需要单独引用）
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
