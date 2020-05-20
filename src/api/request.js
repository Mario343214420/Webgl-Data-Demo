import store from '../store'
import { ACCESS_TOKEN } from '../common/token-const'
/**
 *创建服务实例
 */
import request from 'axios'
import router from '../router'
import Qs from 'qs'
import BinUI from 'bin-ui'
import util from '../common/utils/util'

let baseUrl = process.env.NODE_ENV !== 'production' ? '/' : '/ncloud'
const service = request.create({
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 60000 // 请求超时时间
})
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = util.cookies.get(ACCESS_TOKEN)
    // 响应时触发错误
    if (error.response.status >= 500) { // 如果是服务器端错误则跳转至服务错误页面
      router.push({ path: '/500' })
    } else if (error.response.status === 404) {
      router.push({ path: '/404' })
    } else if (error.response.status === 403) {
      router.push({ path: '/403' })
    } else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      BinUI.Message.message({ content: 'Authorization verification failed', type: 'danger' })
      if (token) {
        store.dispatch('logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    } else {
      BinUI.Message.message({ content: data.message, type: 'danger' })
    }
  }
  return Promise.reject(error)
}
// request interceptor
service.interceptors.request.use(config => {
  const token = util.cookies.get(ACCESS_TOKEN)
  if (token && token !== 'undefined') {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

/**
 * response 拦截器
 */
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // 响应时触发错误
      if (error.response.status >= 500) { // 如果是服务器端错误则跳转至服务错误页面
        router.push({ path: '/500' })
      } else if (error.response.status === 404) {
        router.push({ path: '/404' })
      } else if (error.response.status === 403) {
        router.push({ path: '/403' })
      } else {
        BinUI.Message.message({ content: error.response.data.message, type: 'danger' })
      }
    } else {
      // console.log('Error', error.message)
      router.push({ path: '/500' })
    }
    return Promise.reject(error)
  }
)

export default service

/**
 * post请求
 * @param url
 * @param data
 */
export function requestPost(url, data) {
  return service({
    url: url,
    method: 'post',
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

/**
 * post请求
 * @param url
 * @param data
 */
export function requestPostFormData(url, data) {
  return service({
    url: url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

/**
 * 向formData中添加新的项，如果值为null则跳过
 * @param formData FormData
 * @param name 参数名
 * @param value 参数值
 */
export function appendFormData(formData, name, value) {
  if (value != null) {
    formData.append(name, value)
  }
}

export function requestGetDownloadProcess(url, data, downloadProcess) {
  return service({
    timeout: 10000 * 60, // 请求超时时间
    url: url,
    method: 'get',
    params: data,
    headers: { 'Content-Type': 'application/octet-stream;charset=utf-8' },
    responseType: 'arraybuffer',
    onDownloadProgress: downloadProcess
  })
}
