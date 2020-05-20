import { getAdminSetting, setAdminSetting } from '../../common/config/datastore'
import { deepCopy } from '../../common/utils/assist'

const app = {
  state: {
    sidebar: true,
    theme: '',
    menuType: '',
    headerMenu: [],
    asideMenu: []
  },
  mutations: {
    EXAMPLE: (state, val) => {
      state.xxx = val
    }
  },
  actions: {
    testAction: ({ commit, state }) => {
      commit('EXAMPLE', state.testAction)
    }
  }
}

// 过滤菜单
function filterMenu(routes) {
  let arr = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.path !== '*' || !tmp.hidden) { // 过滤顶级菜单，即，404和已经隐藏的
      if (tmp.children) {
        tmp.children = filterMenu(tmp.children)
      }
      let obj = {}
      obj.path = tmp.path // 这里的路由path默认都为不带/
      obj.title = tmp.meta.title
      if (tmp.meta.icon) {
        obj.icon = tmp.meta.icon
      }
      if (tmp.children) {
        obj.children = tmp.children
      }
      arr.push(obj)
    }
  })
  return arr
}

export default app
