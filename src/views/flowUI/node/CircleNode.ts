/*
 * @Author: guoshouying
 * @Date: 2025-04-11 15:57:29
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-11 16:22:33
 * @FilePath: \wlh_web_pro\src\components\node\CircleNode.ts
 */
// CircleNode.ts
import { CircleNode, CircleNodeModel } from "@logicflow/core";

class ResizableCircleModel extends CircleNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    // 设置节点可调整大小
    this.setProperties({
      resizable: true,
    });
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = "#FF6600";
    style.fill = "#dd1a18";
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.color = "#000"; // 文字
    style.fontSize = 14;
    return style;
  }
}

class ResizableCircleView extends CircleNode {}

export default {
  type: "custom-circle",
  view: ResizableCircleView,
  model: ResizableCircleModel,
};
