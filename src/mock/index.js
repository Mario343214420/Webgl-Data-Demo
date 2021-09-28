import Mock from 'mockjs'

// https://github.com/nuysoft/Mock/wiki/Getting-Started
// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
import './services/users'

Mock.setup({
    timeout: 500, // setter delay time
})
