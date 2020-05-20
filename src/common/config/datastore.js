import storage from 'good-storage'
import setting from './setting.cfg'
// 本地缓存库

// app系统设置内容
const KEY = '__bin_admin_setting__'

export function getAdminSetting() {
  return storage.get(KEY, setting)
}

export function setAdminSetting(setting) {
  return storage.set(KEY, setting)
}
