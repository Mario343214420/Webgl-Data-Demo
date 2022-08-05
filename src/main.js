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

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
// 手动引入 ECharts 各模块来减小打包体积
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  LineChart,
  BarChart,
  GraphChart
} from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  GraphicComponent,
  MarkAreaComponent
} from 'echarts/components'

use([
  LineChart,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  GraphicComponent,
  GraphChart,
  MarkAreaComponent
]);

// 全局注册组件（也可以使用局部注册）
Vue.component('e-chart', ECharts)

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
