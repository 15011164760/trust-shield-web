/*
 * @Author: yangdongxu
 * @Date: 2025-04-21 18:31:48
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 18:10:10
 * @FilePath: \trust-shield-web\src\api\http.ts
 */
// src/utils/http.js

import axios from 'axios'

// 创建一个 Axios 实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 根据环境变量动态设置基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以在这里设置其他全局请求头
  },
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加 token 到请求头
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data // 直接返回数据部分，简化调用处的处理
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器返回了错误响应
      console.error('Response error:', error.response.data)
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      console.error('Request error:', error.request)
    } else {
      // 其他错误
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  },
)

// 导出封装好的 Axios 实例
export default http
