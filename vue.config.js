// 配置路径别名
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置基础链接地址，根据发布环境添加 '/preview/bin-admin'
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dir'
    : '/',
  // dev跨域问题
  devServer: {
    proxy: {
      '/auth': { target: 'http://localhost:8082/' },
      '/user': { target: 'http://localhost:8082/' },
      '/management': { target: 'http://localhost:8082/' },
      '/api': { target: 'http://localhost:8082/' },
      '/da': { target: 'http://localhost:8082/' }
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
