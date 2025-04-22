/*
 * @Author: yangdongxu
 * @Date: 2025-04-21 16:09:41
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 18:03:16
 * @FilePath: \trust-shield-web\src\main.ts
 */
import './assets/main.css'
let obj = {
  environment: import.meta.env.MODE, // 当前环境模式：development/test/production
  apiUrl: import.meta.env.VITE_API_URL, // 动态加载的 API URL
}
console.log(obj)
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
