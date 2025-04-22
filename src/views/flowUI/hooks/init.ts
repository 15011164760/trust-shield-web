import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { onMounted, reactive, ref } from "vue";
import UserTaskNode from "../node/UserTaskNode";
import CircleNode from "../node/CircleNode";
import UserTaskHtml from "../node/UserTaskHtml";
import UserTaskVue from "../node/UserTaskVue";
import customEdge from "../edge/customEdge";
import { Menu, lfJson2Xml } from "@logicflow/extension";
import { DndPanel, Control, MiniMap, Snapshot } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import flowControls from "./controls";
import addMenuConfig from "./addMenuConfig";
import dndPanelControls from "./dndPanelControls";

LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(Control);
// 注册 miniMap 扩展
LogicFlow.use(MiniMap);
LogicFlow.use(Snapshot);
let lf = reactive(null);
let inter = (container, exportDataRef) => {
  console.log("HelloWorld mounted", container);
  lf = new LogicFlow({
    container: container,
    grid: true,
    style: {
      circle: {
        fill: "#42608d",
        stroke: "pink",
        strokeWidth: 2,
      },
      baseEdge: {
        stroke: "#42608d",
        strokeWidth: 2,
      },
    },
    keyboard: {
      enabled: true,
    },
  });
  // 注册UserTaskNode组件
  lf.register(UserTaskNode);
  lf.register(CircleNode);
  // 注册UserTaskHtml组件
  lf.register(UserTaskHtml);
  // 注册customEdge组件
  lf.register(customEdge);
  // 注册UserTaskVue组件
  lf.register(UserTaskVue);
  // lf.setDefaultEdgeType('custom-edge');
  flowControls(lf, exportDataRef);
  // 为菜单追加选项（必须在 lf.render() 之前设置）
  addMenuConfig(lf);
  // 设置拖放面板中的项目
  dndPanelControls(lf);
  // 监听连接被拒绝事件
  lf.on("connection:not-allowed", (msg) => {
    // 打印拒绝连接的消息
    console.log(msg);
    alert("连接被拒绝");
  });
  lf.setTheme({
    circle: {
      stroke: "#a3c0a5", // 边框颜色
      fill: "#10a81c", // 填充颜色
      strokeWidth: 2,
    },
    nodeText: {
      color: "#000", // 全局节点文字颜色（红色）
      fontSize: 14,
      overflowMode: "ellipsis", // 文字溢出处理
    },
    edgeText: {
      fill: "#42608d",
      fontSize: 20,
    },
  });
  lf.render({
    nodes: [
      {
        id: "1",
        type: "user-task-node",
        x: 150,
        y: 100,
        text: "用户任务",
        properties: {
          statu: "pass",
          name: "用户任务",
        },
      },
      {
        id: "2",
        type: "circle",
        x: 400,
        y: 200,
        text: "节点2",
      },
      {
        id: "3",
        type: "useTaskHtml",
        x: 400,
        y: 400,
        text: "polygon",
      },
      // {
      //   id: "4",
      //   type: "diamond",
      //   x: 510,
      //   y: 410,
      //   text: "polygon",
      // },
      // {
      //   id: "5",
      //   type: "text",
      //   x: 580,
      //   y: 410,
      //   text: "text",
      // },
      // {
      //   id: "6",
      //   type: "html",
      //   x: 610,
      //   y: 410,
      //   text: "html",
      // },
    ],
    edges: [
      // {
      //   sourceNodeId: "1",
      //   targetNodeId: "2",
      //   type: "polyline",
      //   text: "连线",
      // },
      {
        sourceNodeId: "1",
        targetNodeId: "2",
        type: "custom-edge",
        text: "连线",
      },
      //   {
      //   sourceNodeId: "1",
      //   targetNodeId: "3",
      //   type: "bezier",
      //   startPoint: {
      //     x: 150,
      //     y: 100
      //   },
      //  }
    ],
  });
  //     // 监听拖拽结束事件
  // lf.on("node:dnd-dragend", (data) => {
  //   console.log("node:dnd-dragend: 拖拽结束", data.data);
  //   // 这里可以处理拖拽结束后的逻辑，比如保存节点位置或触发其他操作

  //   // 示例：获取拖拽后的节点位置
  //   const nodeModel = data.data.nodeModel; // 拖拽的节点模型
  //   if (nodeModel) {
  //     console.log("节点新位置:", nodeModel.x, nodeModel.y);
  //     // 你可以在这里将新位置发送到后端保存
  //   }
  // });
  // // 监听拖拽中事件
  // lf.on("node:dnd-drag", (data) => {
  //   console.log("node:dnd-drag: 外部拖入节点拖拽中触发", data.data);
  //   // lf.dnd.stopDrag(); // 鼠标释放时结束拖拽
  //   // 这里可以处理拖拽中的逻辑，比如动态更新预览位置
  // });
  // lf.on('node:dnd-add', ({ data }) => {
  //   console.log('节点已添加:', data);
  //   // 可以在这里修改节点属性
  //   lf.setProperties(data.id, {
  //     customProp: 'value'
  //   });
  // });
};

let processFileContentFn = (data) => {
  console.log("导入内容", data);
  lf.render(JSON.parse(data)); // 渲染数据到画布
};
export { inter, processFileContentFn, lf };
