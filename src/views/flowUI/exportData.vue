<!--
 * @Author: yangdongxu
 * @Date: 2025-04-22 11:02:39
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 16:13:53
 * @FilePath: \trust-shield-webd:\find_work_2024_year_first\wlh_web_pro\src\components\exportData.vue
-->
<template>
  <div class="export-data" ref="exportDataRef">
    <!-- <button @click="triggerFileInput">导入文件</button> -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let props = defineProps(["processFileContentFn"]);
let exportDataRef = ref(null);
const fileInput = ref(null);
const fileContent = ref(null);
const triggerFileInput = () => {
  fileInput.value.click();
};
defineExpose({
  triggerFileInput,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // console.log(" e.target.result=", e.target.result);
      fileContent.value = e.target.result;
      props.processFileContentFn(fileContent.value);
    };
    reader.onerror = (err) => {
      console.error("读取文件时出错:", err);
    };
    reader.readAsText(file);
  }
};
</script>

<style scoped>
/* 添加一些简单的样式 */
button {
  margin-bottom: 10px;
}
</style>
