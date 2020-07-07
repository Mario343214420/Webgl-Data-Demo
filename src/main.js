import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mock
import './mock/mockServer'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
