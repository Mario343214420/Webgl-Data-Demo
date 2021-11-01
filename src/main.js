import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)
// mock
// import './mock/mockServer'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
