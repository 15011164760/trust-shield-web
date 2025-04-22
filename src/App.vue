<!--
 * @Author: yangdongxu
 * @Date: 2025-04-21 16:09:41
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 18:17:58
 * @FilePath: \trust-shield-web\src\App.vue
-->
<!--
 * @Author: yangdongxu
 * @Date: 2025-04-21 16:09:41
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 18:14:16
 * @FilePath: \trust-shield-web\src\App.vue
-->
<script lang="ts" setup>
import LogicFlow from '@/views/flowUI/LogicFlow.vue'
</script>

<template>
  <!-- <LogicFlow /> -->
  <div class="routerMargin">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/flow">流程图</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
.routerMargin {
  display: flex;
  justify-content: space-around;
}
</style>
