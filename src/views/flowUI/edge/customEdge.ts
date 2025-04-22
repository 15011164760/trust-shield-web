/*
 * @Author: guoshouying
 * @Date: 2025-04-10 22:21:13
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-11 17:23:21
 * @FilePath: \wlh_web_pro\src\components\edge\customEdge.ts
 */
import {
  PolylineEdgeModel,
  PolylineEdge,
  BezierEdge,
  BezierEdgeModel,
} from "@logicflow/core";
class CustomEdgeModel extends PolylineEdgeModel {
  setAttributes(): void {
    this.style.strokeWidth = 2; // 设置边的线宽
    this.style.stroke = "#42608d"; // 设置边的颜色
    // this.isAnimation = true; // 设置边是否需要动画
  }
  // 获取边的动画样式
  getEdgeAnimationStyle() {
    // 调用父类的方法获取边的动画样式
    const style = super.getEdgeAnimationStyle();
    // 设置边的虚线样式
    style.strokeDasharray = "5 5";
    // 设置边的动画时长
    style.animationDuration = "100s";
    style.stroke = "blue"; // 设置边的颜色
    return style;
  }
}
class CustomEdgeView extends PolylineEdge {}
export default {
  type: "custom-edge", // 必填，用于指定该自定义节点类型在画布中渲染成什么样子
  model: CustomEdgeModel,
  view: CustomEdgeView,
};
