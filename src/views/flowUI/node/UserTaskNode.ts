// UserTaskNode.js
import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";

// class UserTaskModel extends RectNodeModel {}

// class UserTaskView extends RectNode {}

class UserTaskModel extends RectResize.model {
  // 获取节点的样式
  getNodeStyle() {
    // 调用父类的方法获取节点的样式
    const style = super.getNodeStyle();
    // 设置节点的边框颜色为蓝色
    style.stroke = "#2e4f7d";
    style.fill = "#ced5df"; // 设置节点的填充颜色为白色
    // 设置节点的边框虚线样式为3个像素的实线和3个像素的空白
    // style.strokeDasharray = "3 3";
    const properties = this.properties;
    /* if (properties.statu === "pass") {
      style.stroke = "rgb(24, 125, 255)";
    } else if (properties.statu === "reject") {
      style.stroke = "red";
    } else {
      style.stroke = "rgb(24, 125, 255)";
    } */
    // 返回节点的样式
    return style;
  }
  // 获取文本样式
  getTextStyle() {
    // 调用父类的方法获取文本样式
    const style = super.getTextStyle();
    // 设置字体大小为16
    style.fontSize = 16;
    // 设置字体颜色为红色
    style.color = "#000";
    // 返回样式
    return style;
  }
  // 初始化节点数据
  initNodeData(data) {
    // 调用父类的方法
    super.initNodeData(data);
    // 设置节点宽度为200
    this.width = 200;
    // 设置节点高度为80
    this.height = 80;
    // 设置节点半径为50
    // this.radius = 50;
    this.text.draggable = false; // 不允许文本被拖动
    this.text.editable = true; // 不允许文本被编辑
    const circleOnlyAsTarget = {
      message: "正方形节点下一个节点只能是圆形节点",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return targetNode.type === "circle";
      },
    };
    // this.sourceRules.push(circleOnlyAsTarget);
  }
}

class UserTaskView extends RectResize.view {
  // 获取标签形状
  private getLabelShape() {
    // 获取props中的model
    const { model } = this.props;
    // 获取model中的x、y、width、height
    const { x, y, width, height } = model;
    // 获取model中的样式
    const style = model.getNodeStyle();
    // 返回一个svg元素，包含一个path元素
    return h(
      "svg",
      {
        // 设置svg元素的x、y、width、height和viewBox
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: "0 0 1274 1024",
      },
      h("path", {
        // 设置path元素的fill和d
        fill: style.stroke,
        d: "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z",
      })
    );
  }
  /**
   * 完全自定义节点外观方法
   */
  // 获取形状
  getShape() {
    // 获取props中的model和graphModel
    const { model, graphModel } = this.props;
    // 获取model中的x、y、width、height和radius
    const { x, y, width, height, radius } = model;
    // 获取model中的样式
    const style = model.getNodeStyle();
    // 继承父类的缩放逻辑
    const shapeGroup = super.getShape();
    // 追加自定义内容
    shapeGroup.props.children.push(this.getLabelShape());
    // 返回一个g元素，包含一个rect元素和getLabelShape()方法返回的元素
    return h("g", {}, [
      h("rect", {
        // 将样式、x、y、width、height和radius作为属性传入rect元素
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
      }),
      // 调用getLabelShape()方法，返回一个元素
      this.getLabelShape(),
      shapeGroup.props.children, // 取出父类的缩放逻辑
    ]);

    return shapeGroup;
  }
}

export default {
  type: "user-task-node",
  view: UserTaskView,
  model: UserTaskModel,
};
