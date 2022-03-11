// 配置路径别名
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置基础链接地址，根据发布环境添加 '/preview/bin-admin'
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // dev跨域问题
  devServer: {
    proxy: {
      '/public': { target: 'http://localhost:8082/' },
      '/union': { target: 'http://localhost:8082/' },
      '/map': { target: 'http://localhost:8082/' },
      '/summary': { target: 'http://localhost:8082/' },
      '/s': {
        target: 'http://192.168.1.222:90/'
      }
      // 'sockjs-node': {
      //   target: 'http://192.168.1.222:90',
      //   ws: false,
      //   changeOrigin: true
      // },
    }
  },
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  filenameHashing: true, // 发布打包文件是否有哈希后缀
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
