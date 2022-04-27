import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Dialog, Input, Row, Col, Checkbox, Slider, Select, Option } from 'element-ui'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// const options = { path: '/s/' }
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO('http://192.168.1.222:90', options), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Option)
Vue.use(Slider)
Vue.use(Select)
// mock
// import './mock/mockServer'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
