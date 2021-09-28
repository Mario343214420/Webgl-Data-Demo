import Mock from 'mockjs'
import { builder, getBody } from '../util'
import users from '@/mock/list/users'

// 默认用户名密码
const username = ['admin', 'mario_20']
const password = ['admin', '123456']

const login = (options) => {
    // 拼装请求体
    const body = getBody(options)
    if (username.includes(body.username) && password.includes(body.password)) {
        return builder({ accessToken: '4291d7da9005377ec9aec4a71ea837f' }, '', '00', { 'Custom-Header': Mock.mock('@guid') })
    }
    return builder(false, '账户或密码错误', '401')
}

Mock.mock(/\/user\/login/, 'post', login)
