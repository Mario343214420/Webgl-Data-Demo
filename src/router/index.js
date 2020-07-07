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
      component: Home
    },
    {
      path: '/overview',
      component: Overview
    },
    {
      path: '/summary',
      component: Summary
    },
    {
      path: '/public',
      component: Public
    },
    {
      path: '/union',
      component: Union
    },
    {
      path: '/map',
      component: Map
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
