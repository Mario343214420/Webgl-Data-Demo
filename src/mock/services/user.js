import Mock from 'mockjs'
import { builder, getBody } from '../util'

// 默认的用户名密码
const username = ['admin', 'user', 'super']
const password = ['admin', 'user'] // admin,

const login = (options) => {
  // 拼装请求体
  const body = getBody(options)
  // console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }
  return builder({
    'id': Mock.mock('@guid'),
    'name': '王彬',
    'username': 'admin',
    'password': '',
    'status': 1,
    'roleId': 'admin',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const info = (options) => {
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '王彬',
    username: 'admin',
    password: '',
    creatorId: 'admin',
    roles: ['admin']
  }
  return builder(userInfo)
}

const verifyCode = Mock.Random.image('250x90', '#FF6600')

Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/info/, 'get', info)
Mock.mock('/auth/verifyCode', 'get', { data: verifyCode })
