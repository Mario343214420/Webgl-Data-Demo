// 登录相关接口文件
import request, { requestPost } from './request'

/**
 * 获取4位验证码
 */
export function getVerifyCode() {
  return request.get('/auth/verifyCode', {
    responseType: 'arraybuffer'
  })
}

/**
 * 登录方法
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param data
 * @returns {*}
 */
export function login(data) {
  return requestPost('/auth/login', data)
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getInfo() {
  return request.get('/user/info')
}

/**
 * 修改登录密码
 * @param oldPwd
 * @param pwd
 * @param confirmPwd
 */
export function modifyPwd(oldPwd, pwd, confirmPwd) {
  return request({
    url: '/user/modifyPwd',
    method: 'post',
    data: {
      oldPwd: oldPwd,
      pwd: pwd,
      confirmPwd: confirmPwd
    }
  })
}
