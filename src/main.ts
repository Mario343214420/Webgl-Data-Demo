import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
// ts引入不能忽略文件名后缀
import router from '@/router/index.ts'
import './mock'

const app = createApp(App)

app.use(router)
router.isReady().then(() => {
    app.mount('#app', true)
})
