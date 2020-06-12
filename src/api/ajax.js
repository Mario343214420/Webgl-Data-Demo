import axios from 'axios'
export default (url = '', data = {}, type = 'GET')=>{
  return new Promise((resolve, reject)=>{
    let promise
    if (type === 'GET') {
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += key + '=' +data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      //发送GET请求
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then((res)=>{
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
