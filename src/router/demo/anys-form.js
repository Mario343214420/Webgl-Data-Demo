import layout from '../../views/layout/index'
import secondRouter from '../../views/layout/SecondRouter'

export default {
  path: '/demo',
  component: layout,
  redirect: 'noRedirect',
  meta: { title: '示例案例', icon: 'logo-freebsd-devil', roles: true },
  children: [
    {
      path: 'res',
      component: secondRouter,
      redirect: { name: 'Classify' },
      meta: { title: '表单验证', icon: 'ios-bonfire', roles: true },
      children: [
        {
          path: 'anysForm',
          name: 'AnysForm',
          component: () => import(/* webpackChunkName: "test" */ '../../pages/demo/AnysForm'),
          meta: { title: '动态表单测试', roles: true }
        }
      ]
    }
  ]
}
