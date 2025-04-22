<!--
 * @Author: yangdongxu
 * @Date: 2025-04-09 14:41:33
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 16:44:10
 * @FilePath: \trust-shield-webd:\find_work_2024_year_first\wlh_web_pro\src\views\flowUI\LogicFlow.vue
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { inter, processFileContentFn, lf } from "./hooks/init";
import exportData from "./exportData.vue";
import {
  startDragRect,
  startDragCircle,
  startDragCustom,
} from "./hooks/defineControls";
let container = ref(null);
let exportRef = ref(null);
onMounted(() => {
  inter(container.value, exportRef);
});
</script>

<template>
  <!-- 自定义按钮区域 -->
  <div class="custom-toolbar">
    <button @mousedown="startDragRect(lf)">拖拽矩形</button>
    <button @mousedown="startDragCircle(lf)">拖拽圆形</button>
    <button @mousedown="startDragCustom(lf)">拖拽自定义节点</button>
  </div>
  <exportData
    ref="exportRef"
    :processFileContentFn="processFileContentFn"
  ></exportData>
  <div class="container" ref="container"></div>
</template>

<style lang="scss" scoped>
#div {
  span {
    color: blue;
  }
}

.container {
  width: 90vw;
  height: 90vh;
}

:deep(.custom-minimap) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/1.png") !important;
  background-size: cover;
}

:deep(.custom-save) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/2.png") !important;
  background-size: cover;
}

:deep(.custom-clear) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/3.png") !important;
  background-size: cover;
}

:deep(.custom-downloadImg) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/4.png") !important;
  background-size: cover;
}

:deep(.custom-fullscreen) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/fullscreen.png") !important;
  background-size: cover;
}
:deep(.custom-jsonsave) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/jsonsave.png") !important;
  background-size: cover;
}
:deep(.custom-xmlsave) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/xmlsave.png") !important;
  background-size: cover;
}
:deep(.custom-jsonload) {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/flow/jsonload.png") !important;
  background-size: cover;
}
.custom-toolbar {
  background-color: #b1bde9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  display: flex;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  button:active {
    background-color: #004085;
  }

  button:focus {
    outline: none;
  }
}
</style>
