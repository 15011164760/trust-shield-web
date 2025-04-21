<!--
 * @Author: yangdongxu
 * @Date: 2025-04-21 16:09:41
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-21 18:50:41
 * @FilePath: \trust-shield-web\src\views\AboutView.vue
-->
<script setup lang="ts">
import http from '@/api/http'; // 根据你的项目结构调整路径
import { onMounted, ref } from 'vue'
let data = ref(); // 定义一个响应式数据
let selectData = ref(); // 定义一个响应式数据
const fetchData = async () => {
  try {
    let reqData = await http.get('https://jsonplaceholder.typicode.com/posts'); // 使用封装好的 Axios 实例发送请求
    data.value = reqData; // 获取响应数据
    console.log('Fetched data:', reqData);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
onMounted(() => {

})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="aaa">
      <div class="b">yang</div>
      <button @click="fetchData">Fetch Data</button>
      <div>
        <el-select v-model="selectData" placeholder="Select" size="small" style="width: 240px">
          <el-option v-for="item in data" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.aaa {
  .b {
    color: red;
  }
}
</style>
