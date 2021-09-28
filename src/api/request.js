import axios from 'axios'
import cookies from '../utils/cookies'

const ACCESS_TOKEN = 'Access-Token'

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/mock'

const service = axios.create({
    baseUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 60000, // 请求超时时间
})

service.interceptors.request.use(config => {
    const token = cookies.get(ACCESS_TOKEN)
    if (token && token !== 'undefined') {
        config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, err)

export default service
