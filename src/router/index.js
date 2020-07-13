import Vue from 'vue'
import VueRouter from 'vue-router'
import BinUI from 'bin-ui'

const Home = () => import('../pages/data/home/Home')
const Overview = () => import('../pages/data/overview/Overview')
const Summary = () => import('../pages/data/summary/Summary')
const Public = () => import('../pages/data/public/Public')
const Union = () => import('../pages/data/union/Union')
const Map = () => import('../pages/data/map/Map')

Vue.use(BinUI)

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      title: '首页',
      component: Home
    },
    {
      path: '/overview',
      title: '系统概况专题',
      component: Overview
    },
    {
      path: '/summary',
      title: '数据归集专题',
      component: Summary
    },
    {
      path: '/public',
      title: '双公示专题',
      component: Public
    },
    {
      path: '/union',
      title: '联合奖惩专题',
      component: Union
    },
    {
      path: '/map',
      title: '区域数据归集',
      component: Map
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
