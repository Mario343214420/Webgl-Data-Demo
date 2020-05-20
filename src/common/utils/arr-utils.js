import { deepCopy } from './assist'

export function toFirst (fieldData, index) {
  let arr = deepCopy(fieldData)
  if (index !== 0) {
    arr.unshift(arr.splice(index, 1)[0])
  }
  return arr
}

export function toLast (fieldData, index) {
  let arr = deepCopy(fieldData)
  if (index !== arr.length - 1) {
    arr.push(arr.shift())
  }
  return arr
}

export function upGo (fieldData, index) {
  let arr = deepCopy(fieldData)
  if (index !== 0) {
    arr[index] = arr.splice(index - 1, 1, arr[index])[0]
  }
  return arr
}

export function downGo (fieldData, index) {
  let arr = deepCopy(fieldData)
  if (index !== arr.length - 1) {
    arr[index] = arr.splice(index + 1, 1, arr[index])[0]
  }
  return arr
}
