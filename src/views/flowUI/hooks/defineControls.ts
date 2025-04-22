/*
 * @Author: yangdongxu
 * @Date: 2025-04-22 14:41:29
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 15:28:07
 * @FilePath: \trust-shield-webd:\find_work_2024_year_first\wlh_web_pro\src\components\hooks\defineControls.ts
 */
//
// 手动触发矩形节点拖拽
let startDragRect = (lf) => {
  lf.dnd.startDrag({
    type: "rect",
    text: "矩形节点",
    width: 100,
    height: 60,
  });
};
// 手动触发圆形节点拖拽
let startDragCircle = (lf) => {
  lf.dnd.startDrag({
    type: "circle",
    text: "圆形节点",
    properties: {
      backgroundColor: "#52c41a",
    },
    r: 30, // 圆形半径
  });
};
// 手动触发自定义节点拖拽
let startDragCustom = (lf) => {
  lf.dnd.startDrag({
    type: "user-task-node",
    text: "自定义节点",
    properties: {
      customProp: "value",
    },
    width: 120,
    height: 80,
    x: 200,
    y: 200,
  });
};
export  { startDragRect, startDragCircle, startDragCustom };
