import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '@/views/Home.vue'
const routes: Array<RouteRecordRaw> = [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/area',
      name: 'Area',
      component: () => import('@/views/Area/Area.vue')
    },
    {
      path: '/camera',
      name: 'Camera',
      component: () => import('@/views/Camera/Camera.vue')
    },
    {
      path: '/model',
      name: 'Model',
      component: () => import('@/views/Model/Model.vue')
    },
    {
      path: '/warn',
      name: 'Warn',
      component: () => import('@/views/Warn/Warn.vue')
    },
    {
        path: '/',
        redirect: '/home'
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
