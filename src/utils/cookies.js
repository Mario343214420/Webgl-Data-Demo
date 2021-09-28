import Cookies from 'js-cookie'

const cookies = {}

cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
    const currentCookieSetting = {
        expires: 1
    }
    Object.assign(currentCookieSetting, cookieSetting)
    Cookies.set(`${KEY}-${name}`, value, currentCookieSetting)
}

export default cookies
