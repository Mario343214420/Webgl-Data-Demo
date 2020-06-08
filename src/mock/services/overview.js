import Mock from 'mockjs'

responseBody.data = data
if (message !== undefined && message !== null) {
  responseBody.message = message
}
if (code !== 0) {
  responseBody.code = code
  responseBody._status = code
}
if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
  responseBody._headers = headers
}
responseBody.timestamp = new Date().getTime()

const overview = (options) => {
  // 拼装请求体

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
