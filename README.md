# trust-shield-web

该模板可以帮助你开始使用 Vue 3 和 Vite 进行开发。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）。

## 在 TS 中为 `.vue` 导入提供类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` CLI 进行类型检查。在编辑器中，我们需要使用 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 来让 TypeScript 语言服务识别 `.vue` 类型。

## 自定义配置

查看 [Vite 配置参考文档](https://vite.dev/config/)。

## 项目设置

```sh
npm install
```

### 编译并开启热更新（开发环境）

```sh
npm run dev
```

### 类型检查、编译并压缩（生产环境）

```sh
npm run build
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
npm run lint
```

==========================

# 技术选型方案指定 ：使用vite+vue3+ts+elementPlus开发

### 1. 安装环境node.js版本:v18.20.3

### 使用官方推荐工具下载项目模版：

```
 npm create vue@latest

```

### 下载UI组件库 作用：快速搭建页面

```
npm install element-plus --save
```

### 下载axios 作用：发送网络请求

```
npm install axios
```

### 按需导入element-plus

您需要使用额外的插件来导入要使用的组件。

#### 自动导入

首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

npm install -D unplugin-vue-components unplugin-auto-import
然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中

Vite按需引入element-plus配置

```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

```
