/*
 * @Author: yangdongxu
 * @Date: 2025-04-22 14:53:20
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 17:17:54
 * @FilePath: \trust-shield-webd:\find_work_2024_year_first\wlh_web_pro\src\views\flowUI\hooks\addMenuConfig.ts
 */
export default function addMenuConfig(lf) {
  // 添加新节点的函数
  function addNodeAfter(targetNodeId) {
    const targetNode = lf.getNodeModelById(targetNodeId);
    if (!targetNode) return;
    // 获取画布大小
    const canvasWidth = lf.graphModel.width;
    const canvasHeight = lf.graphModel.height;

    // 计算新节点的位置
    const offsetX = 250; // 水平偏移量
    const offsetY = 0; // 垂直偏移量
    const newNodePosition = {
      x: Math.min(targetNode.x + offsetX, canvasWidth - 100), // 确保不超出画布
      y: targetNode.y + offsetY,
    };

    // 添加新节点
    const newNodeId = `newNode_${Date.now()}`; // 生成唯一ID
    lf.addNode({
      id: newNodeId,
      type: "user-task-node",
      x: newNodePosition.x,
      y: newNodePosition.y,
      text: "矩形节点",
    });

    // 添加连接边
    lf.addEdge({
      type: "polyline", // 或 'straight'
      sourceNodeId: targetNodeId,
      targetNodeId: newNodeId,
    });
  }
  // 为菜单追加选项（必须在 lf.render() 之前设置）
  lf.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: "分享",
        callback() {
          alert("分享成功！");
        },
      },
      {
        text: "属性",
        callback(node: any) {
          alert(`
          节点id：${node.id}
          节点类型：${node.type}
          节点坐标：(x: ${node.x}, y: ${node.y})`);
        },
      },
      {
        text: "新加",
        callback(node: any) {
          addNodeAfter(node.id); // 调用添加新节点的函数
        },
      },
    ],
    edgeMenu: [
      {
        text: "属性",
        callback(edge: any) {
          alert(`
          边id：${edge.id}
          边类型：${edge.type}
          边坐标：(x: ${edge.x}, y: ${edge.y})
          源节点id：${edge.sourceNodeId}
          目标节点id：${edge.targetNodeId}`);
        },
      },
    ],
    graphMenu: [
      {
        text: "分享",
        callback() {
          alert("分享成功！");
        },
      },
    ],
  });
}
