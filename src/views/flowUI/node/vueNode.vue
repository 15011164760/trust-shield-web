<!--
 * @Author: guoshouying
 * @Date: 2025-04-10 15:45:50
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-15 22:50:31
 * @FilePath: \wlh_web_pro\src\components\node\vueNode.vue
-->
<template>
    <div>
        isHovered:{{ isHovered }}-
        isSelected:{{ isSelected }}==============
    </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { BaseNodeModel } from '@logicflow/core'
defineProps({
    model:{
        type:Object as PropType<BaseNodeModel>,
        required:true
    },
    isHovered:{
        type:Boolean,
        default:false
    },
    isSelected:{
        type:Boolean,
        default:false
    }
})
</script>

<style lang="scss" scoped>

</style>