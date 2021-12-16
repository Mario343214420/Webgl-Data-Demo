import tween from "tween.js";

export default {
  async install(Vue, options) {
    Vue.prototype.$tween = this;
    Vue.prototype.$tweener = TWEEN;
    Vue.use(tween);
    // 全局通信
    // Vue.prototype.$EventBus = new Vue()
    // 扩展string方法
    // eslint-disable-next-line no-extend-native
    // String.prototype.isNotEmpty = function () {
    //   return this.length > 0 || this !== ''
    // }
  }
}
