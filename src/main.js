import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mock
import './mock/mockServer'

import ECharts from 'vue-echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.min.css' // （css需要单独引用）
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
