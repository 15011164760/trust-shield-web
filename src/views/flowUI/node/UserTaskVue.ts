/*
 * @Author: guoshouying
 * @Date: 2025-04-10 14:12:06
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-11 10:20:11
 * @FilePath: \wlh_web_pro\src\components\node\UserTaskVue.ts
 */
import { HtmlResize, RectResize } from "@logicflow/extension";
import { createApp } from "vue";
import vueNode from "./vueNode.vue"; // 引入Vue组件
class UseTaskHtmlModel extends HtmlResize.model {
  // setAttributes(): void {
  //   this.text.editable = false; // 设置节点不可编辑
  // }
  setAttributes() {
    this.text.editable = false; // 禁止节点文本编辑
  }
}
class UseTaskHtmlView extends HtmlResize.view {
  shouldUpdate() {
    const data = {
      ...this.props.model.getProperties(),
      isSelected: this.props.model.isSelected,
      isHovered: this.props.model.isHovered,
    };
    if (this.preProperties && this.preProperties === JSON.stringify(data))
      return false; // 如果属性没有变化，则不更新
    this.preProperties = JSON.stringify(data); // 更新上一个属性值
    return true; // 返回true表示需要更新
  }
  setHtml(rootElement: HTMLElement): void {
    rootElement.innerHTML = ""; // 清空根元素的内容
    // 创建一个div元素，并设置其样式和内容
    let el: HTMLElement = document.createElement("div");
    el.style.width = "100%";
    el.style.height = "100%";
    if (this.props.model.isHovered) {
      el.style.border = "2px solid #1890ff";
      el.style.backgroundColor = "pink";
    } else {
      el.style.border = "green 2px solid";
      el.style.backgroundColor = "yellow";
    }
    // el.innerHTML = this.props.model.x+','+this.props.model.y;
    // el.innerHTML = this.props.model.isHovered+'-'+this.props.model.isSelected+'-'+JSON.stringify(this.props.model.properties);
    let app = createApp(vueNode, {
      model: this.props.model,
      isHovered: this.props.model.isHovered,
      isSelected: this.props.model.isSelected,
    }); // 创建Vue应用实例，并传入数据
    app.mount(el); // 挂载Vue应用到div元素上
    rootElement.appendChild(el);
  }
  getText(): "" {
    return " ";
  }
}
export default {
  type: "useTaskVue",
  view: UseTaskHtmlView,
  model: UseTaskHtmlModel,
};
