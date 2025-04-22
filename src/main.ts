/*
 * @Author: yangdongxu
 * @Date: 2025-04-21 16:09:41
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 17:35:45
 * @FilePath: \trust-shield-web\src\main.ts
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
