# trust-shield-web

该文档可以帮助你开始使用 Vue 3 和 Vite 进行开发。

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

### node-sass 与 sass 的区别

node-sass：基于 LibSass 的 Node.js 绑定，但已停止积极维护，不推荐在新项目中使用。
sass（Dart Sass）：官方推荐的 Sass 实现，使用 Dart 编写，性能更好且支持最新 Sass 特性。
建议：在 Node.js 18+ 中，优先使用 sass 而不是 node-sass。

### 2. 安装sass

```
npm install sass --save-dev
```

### 流程图业务使用loginflow：选择理由：文档中文格式且比较完善，功能强大，社区活跃，有丰富的案例

#### 1. 逻辑编排框架：LogicFlow 是一款流程图编辑框架，提供了一系列流程图交互、编辑所必需的功能和灵活的节点自定义、插件等拓展机制。LogicFlow 支持前端研发自定义开发各种逻辑编排场景，如流程图、ER 图、BPMN 流程等。在工作审批配置、机器人逻辑编排、无代码平台流程配置都有较好的应用。

下载logicflow：下载指定版本

```
npm install @logicflow/core@1.2.27  @logicflow/extension@1.2.27 --save
```

=================================================================

在使用 Vite 构建 Vue 项目时，区分开发、测试和生产环境是一个常见的需求。Vite 提供了内置的环境变量支持，可以方便地根据不同环境加载不同的配置或变量。以下是实现区分开发、测试和生产环境的详细步骤：

---

### 1. **环境变量文件**

Vite 使用 `.env` 文件来管理不同环境下的变量。以下是默认支持的环境变量文件：

- `.env`：通用环境变量，所有环境都会加载。
- `.env.development`：开发环境变量。
- `.env.test`：测试环境变量。
- `.env.production`：生产环境变量。

#### 示例：

- `.env`：
  ```env
  VITE_BASE_URL=/
  ```
- `.env.development`：
  ```env
  VITE_API_URL=http://localhost:3000
  ```
- `.env.test`：
  ```env
  VITE_API_URL=https://api.test.com
  ```
- `.env.production`：
  ```env
  VITE_API_URL=https://api.production.com
  ```

---

### 2. **在代码中访问环境变量**

在 Vue 项目中，可以通过 `import.meta.env` 访问定义的环境变量。

#### 示例：

```vue
<template>
  <div>
    <p>当前环境：{{ environment }}</p>
    <p>API URL：{{ apiUrl }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      environment: import.meta.env.MODE, // 当前环境模式：development/test/production
      apiUrl: import.meta.env.VITE_API_URL, // 动态加载的 API URL
    }
  },
}
</script>
```

---

### 3. **在 `vite.config.js` 中根据环境配置**

你可以在 `vite.config.js` 中根据 `import.meta.env.MODE` 动态调整构建配置。

#### 示例：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  console.log('当前环境:', mode) // 输出当前环境（development/test/production）

  const isDev = mode === 'development'
  const isTest = mode === 'test'
  const isProd = mode === 'production'

  return {
    plugins: [vue()],
    base: isProd ? '/production-path/' : '/',
    server: {
      proxy: isTest
        ? { '/api': { target: 'https://api.test.com', changeOrigin: true } }
        : isDev
          ? { '/api': { target: 'http://localhost:3000', changeOrigin: true } }
          : undefined,
    },
    define: {
      __IS_DEV__: isDev,
      __IS_TEST__: isTest,
      __IS_PROD__: isProd,
    },
  }
})
```

---

### 4. **通过脚本指定环境**

在 `package.json` 中，通过 `scripts` 指定构建或运行时的环境。

#### 示例：

```json
{
  "scripts": {
    "dev": "vite", // 默认是 development 模式
    "build:test": "vite build --mode test", // 指定 test 模式
    "build:prod": "vite build --mode production", // 指定 production 模式
    "serve:test": "vite preview --mode test", // 预览 test 构建
    "serve:prod": "vite preview --mode production" // 预览 production 构建
  }
}
```

- 运行 `npm run dev` 时，Vite 会加载 `.env.development` 文件。
- 运行 `npm run build:test` 时，Vite 会加载 `.env.test` 文件。
- 运行 `npm run build:prod` 时，Vite 会加载 `.env.production` 文件。

---

### 5. **动态配置 API 请求**

结合 Axios 或其他 HTTP 客户端，根据环境变量动态设置 API 请求的 URL。

#### 示例：

```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 根据环境变量动态设置
})

export default apiClient
```

---

### 6. **结合 CI/CD**

在 CI/CD 流程中，可以通过环境变量或脚本动态指定构建模式。例如，在 GitHub Actions 中：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Build for test
        run: npm run build:test
        env:
          VITE_API_URL: https://api.test.com
      - name: Build for production
        run: npm run build:prod
        env:
          VITE_API_URL: https://api.production.com
```

---

### 7. **注意事项**

- **环境变量命名规则**：Vite 要求所有自定义环境变量必须以 `VITE_` 开头，否则无法被注入到客户端代码中。
- **避免硬编码**：将所有与环境相关的配置（如 API 地址、路径等）提取到环境变量中，避免在代码中硬编码。
- **测试环境隔离**：确保测试环境与生产环境的数据库、服务隔离，避免测试数据污染生产数据。
- **调试模式**：在开发环境中，可以启用调试工具（如 Vue Devtools）或额外的日志输出。

---

### 8. **完整示例**

假设你有一个 Vue 项目，需要区分开发、测试和生产环境：

- `.env.development`：
  ```env
  VITE_API_URL=http://localhost:3000
  ```
- `.env.test`：
  ```env
  VITE_API_URL=https://api.test.com
  ```
- `.env.production`：
  ```env
  VITE_API_URL=https://api.production.com
  ```

在 Vue 组件中：

```vue
<template>
  <div>
    <p>环境模式：{{ environment }}</p>
    <p>API 地址：{{ apiUrl }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      environment: import.meta.env.MODE, // development/test/production
      apiUrl: import.meta.env.VITE_API_URL, // 动态加载的 API URL
    }
  },
}
</script>
```

运行：

- `npm run dev`：显示开发环境信息。
- `npm run build:test`：构建时使用测试环境配置。
- `npm run build:prod`：构建时使用生产环境配置。

---

通过以上方法，你可以轻松区分开发、测试和生产环境，并确保项目在不同环境下的正确运行。
