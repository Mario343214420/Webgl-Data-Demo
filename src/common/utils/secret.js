// 加密解密函数
import { Base64 } from 'js-base64'

// 解码
export function Decode (str) {
  // 截取前六位随机数值并解码
  return Base64.decode(str.slice(6))
}

/**
 * 掩码
 * @return {string}
 */
export function MaskCode (code, type) {
  let output = code
  if (code == null || code === '') {
    return output
  }
  if (type === 'ID_CODE') {
    if (code.length === 18) {
      output = code.substr(0, 6) + '********' + code.substr(14)
    } else {
      output = '----'
      console.error('身份证位数不合法')
    }
  } else if (type === 'MOBILE_PHONE') {
    if (code.length === 11) {
      output = code.substr(0, 3) + '****' + code.substr(7)
    } else {
      output = '----'
      console.error('手机号不合法')
    }
  }
  return output
}

/**
 * 前面随机6位混淆加密
 * @return {string}
 */
export function Encode (str) {
  return randomStr(6) + Base64.encode(str)
}

function randomStr (length) {
  let result = ''
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charLen = chars.length
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLen))
  }
  return result
}
