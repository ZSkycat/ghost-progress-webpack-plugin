# ghost-progress-webpack-plugin
[![version](https://img.shields.io/npm/v/ghost-progress-webpack-plugin.svg)](https://www.npmjs.com/package/ghost-progress-webpack-plugin)
[![downloads](https://img.shields.io/npm/dt/ghost-progress-webpack-plugin.svg)](https://www.npmjs.com/package/ghost-progress-webpack-plugin)

一个没有副作用的 webpack 进度插件。

语言: [English](https://github.com/ZSkycat/ghost-progress-webpack-plugin#readme) | [中文](https://github.com/ZSkycat/ghost-progress-webpack-plugin/blob/master/README.zh.md)

## 特色
- 不会影响其他工具的输出
- 不会留下丑陋的输出
- 不适合在 CI 环境中使用 (可使用 [simple-progress-webpack-plugin](https://github.com/dominique-mueller/simple-progress-webpack-plugin))

![preview-ghost](https://user-images.githubusercontent.com/20368649/42288692-5ee77a00-7fee-11e8-9480-eeac3469a8a8.gif)

## 起步
#### 安装
```
npm install --save-dev ghost-progress-webpack-plugin
```

#### 用法
```javascript
// 导入
const GhostProgressWebpackPlugin = require('ghost-progress-webpack-plugin').GhostProgressWebpackPlugin;

// 在 webpack 插件配置中实例化它
plugins: [
    new GhostProgressWebpackPlugin()
]
```

## API
```
new GhostProgressWebpackPlugin(format: string);
new GhostProgressWebpackPlugin(options: object);
```

### options.format
**类型:** `'compact' | 'detailed' | 'bar'`<br>
**默认:** `'compact'`<br>

设置输出格式。

`'compact'`
![compact](https://user-images.githubusercontent.com/20368649/42299306-0ae667fa-803d-11e8-984b-967353a51664.gif)

`'detailed'`
![detailed](https://user-images.githubusercontent.com/20368649/42288705-6b298f42-7fee-11e8-8110-73ce4e6eac68.gif)

`'bar'`
![bar](https://user-images.githubusercontent.com/20368649/42288706-7026daa4-7fee-11e8-9b76-d2c8064e3f2e.gif)

### options.stream
**类型:** `NodeJS.WriteStream`<br>
**默认:** `process.stderr`<br>

设置输出所使用的写入流。

## 协议许可
[MIT](https://github.com/ZSkycat/ghost-progress-webpack-plugin/blob/master/LICENSE.txt)
