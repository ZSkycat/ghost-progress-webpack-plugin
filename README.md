# <div style="text-align: center;">ghost-progress-webpack-plugin</div>
A progress plugin for webpack that can be used with other tools.<br>
一个能与其他工具一起使用的 webpack 进度插件。<br>

Preview
![preview-ghost](https://user-images.githubusercontent.com/20368649/42288692-5ee77a00-7fee-11e8-9480-eeac3469a8a8.gif)

As a comparison with `webpack.ProgressPlugin`
![preview-default](https://user-images.githubusercontent.com/20368649/42288700-63b3ae0a-7fee-11e8-9fbe-3cd65488ad0b.gif)

- 不会改变其他工具的输出，像幽灵一样
- 进度完成后，不会留下任何丑陋的输出
- 不能在 CI 环境中使用 (可选择 [simple-progress-webpack-plugin](https://github.com/dominique-mueller/simple-progress-webpack-plugin))

## Getting Started
**Installation** ([npm](https://www.npmjs.com/package/ghost-progress-webpack-plugin))
```
npm install --save-dev ghost-progress-webpack-plugin
yarn add --dev ghost-progress-webpack-plugin
```

**Usage**
```javascript
// import using CommonJS
const GhostProgressWebpackPlugin = require('ghost-progress-webpack-plugin').GhostProgressWebpackPlugin;
// import using ESModule
import { GhostProgressWebpackPlugin } from 'ghost-progress-webpack-plugin';

// add plugin in webpack config
plugins: [
    new GhostProgressWebpackPlugin()
]
```

## API
```
new GhostProgressWebpackPlugin(format);
```

#### format
**Type:** `'compact' | 'detailed' | 'bar'`<br>
**Default:** `'compact'`<br>

`'compact'`
![format-compact](https://user-images.githubusercontent.com/20368649/42299306-0ae667fa-803d-11e8-984b-967353a51664.gif)

`'detailed'`
![format-detailed](https://user-images.githubusercontent.com/20368649/42288705-6b298f42-7fee-11e8-8110-73ce4e6eac68.gif)

`'bar'`
![format-bar](https://user-images.githubusercontent.com/20368649/42288706-7026daa4-7fee-11e8-9b76-d2c8064e3f2e.gif)

## 已知问题
由于无法获取输出光标 `x` 的位置，默认以 `x = 0` 进行处理，即最后输出换行符，大多数场景下的行为也是如此。<br>
当光标位置 `x != 0` 时，有可能出现输出内容被覆盖的情况。<br>

## License
[MIT](https://github.com/ZSkycat/ghost-progress-webpack-plugin/blob/master/LICENSE)
