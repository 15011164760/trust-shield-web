/*
 * @Author: yangdongxu
 * @Date: 2025-04-21 18:21:01
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-21 18:28:16
 * @FilePath: \trust-shield-web\src\api\index.ts
 */
import axios from 'axios'

// 定义一个函数来获取帖子数据
export async function fetchPosts() {
  try {
    // 使用 Axios 发起 GET 请求
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    // 输出响应数据
    console.log(response.data)
  } catch (error) {
    // 处理错误
    console.error('Error fetching posts:', error)
  }
  console.log('sdfdf ')
}
