// 请求模块
import ajax from './ajax'
// ajax(url:'', data = {}, type = 'GET')
// 默认type = 'GET'
export const reqOverviewData = () => ajax('/overview')
export const reqUnionData = () => ajax('/union')
export const reqMapData = () => ajax('/map')
export const reqPublicData = () => ajax('/public')
export const reqSummaryData = () => ajax('/summary')
