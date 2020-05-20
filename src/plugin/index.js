// bin-ui
import BinUI from 'bin-ui'
import 'bin-ui/lib/styles/index.css'
// 本项目的全局自定义组件
// import Breadcrumb from '../components/VBreadcrumb'

export default {
  async install(Vue, options) {
    // bin-ui引用
    Vue.use(BinUI)
    // 全局通信
    Vue.prototype.$EventBus = new Vue()
    // 扩展string方法
    // eslint-disable-next-line no-extend-native
    String.prototype.isNotEmpty = function () {
      return this.length > 0 || this !== ''
    }
  }
}
