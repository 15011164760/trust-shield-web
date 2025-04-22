import { ref } from 'vue'
import { lfJson2Xml } from '@logicflow/extension'
const flowControls = (lf, exportDataRef) => {
  // 注册扩展控制面板
  lf.extension.control.addItem({
    key: 'mini-map',
    iconClass: 'custom-minimap',
    title: '导航',
    text: '导航',
    /*  onMouseEnter: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y)
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35,
      )
    }, */
    // onMouseLeave: (lf, ev) => {
    //   const position = lf.getPointByClient(ev.x, ev.y);
    //   lf.extension.miniMap.hide();
    // },
    onClick: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y)
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35,
      )
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map1',
    iconClass: 'custom-save',
    title: 'sdd',
    text: '保存',
    onClick: (lf, ev) => {
      console.log('点击了mini-map1')
      const graphData = lf.getGraphData() // 获取画布数据
      console.log(graphData) // 输出节点和边的 JSON 数据
      localStorage.setItem('graphData', JSON.stringify(graphData)) // 将数据存储到 localStorage
      // alert("保存成功");
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map1',
    iconClass: 'custom-save',
    title: 'sdd',
    text: '设置初始画布内容',
    onClick: (lf, ev) => {
      console.log('设置初始画布内容onClick')
      let data = localStorage.getItem('graphData')
      lf.render(JSON.parse(data)) // 渲染数据到画布
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map2',
    iconClass: 'custom-clear',
    title: 'sdd',
    text: '清空画布',
    onClick: (lf, ev) => {
      console.log('点击了mini-map1')
      lf.clearData()
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map3',
    iconClass: 'custom-downloadImg',
    title: 'sdd',
    text: '导出图片',
    onClick: (lf, ev) => {
      console.log('lf.getSnapshot();=======')
      lf.getSnapshot()
      const getSnapshotBase64 = lf.getSnapshotBase64().then((res) => {
        console.log('getSnapshotBase64', res.data)
      })
      // let fff=lf.getPng();
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map3',
    iconClass: 'custom-jsonsave',
    title: 'JSON下载',
    text: 'JSON下载',
    onClick: (lf, ev) => {
      console.log('lfJson2Xml;=======')
      const graphData = lf.getGraphData() // 获取画布数据
      console.log(graphData) // 输出节点和边的 JSON 数据
      const str = JSON.stringify(graphData, null, 2)
      const a = document.createElement('a')
      a.href = `data:,${str}`
      a.download = '画布数据.json'
      a.click()
    },
  })
  lf.extension.control.addItem({
    key: 'mini-map3',
    iconClass: 'custom-xmlsave',
    title: 'XML下载',
    text: 'XML下载',
    onClick: (lf, ev) => {
      console.log('lfJson2Xml;=======')
      const graphData = lf.getGraphData() // 获取画布数据
      console.log(graphData) // 输出节点和边的 JSON 数据
      const xml = lfJson2Xml(lf.getGraphData())
      console.log('xml', xml)
      const blob = new Blob([xml], { type: 'text/xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '画布数据.xml'
      a.click()
      // 释放对象 URL
      URL.revokeObjectURL(url)
    },
  })

  lf.extension.control.addItem({
    key: 'mini-map4',
    iconClass: 'custom-jsonload',
    title: '导入JSON',
    text: '导入JSON',
    onClick: (lf, ev) => {
      console.log('点击了mini-map1')
      exportDataRef.value.triggerFileInput()
    },
  })
  function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }
  lf.extension.control.addItem({
    key: 'full-screen',
    iconClass: 'custom-fullscreen',
    title: '全屏',
    text: '全屏',
    onClick: (lf, ev) => {
      toggleFullScreen(lf.container)
    },
  })
}
export default flowControls
