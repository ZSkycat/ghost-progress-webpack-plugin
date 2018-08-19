# ghost-progress-webpack-plugin
[![version](https://img.shields.io/npm/v/ghost-progress-webpack-plugin.svg)](https://www.npmjs.com/package/ghost-progress-webpack-plugin)
[![downloads](https://img.shields.io/npm/dt/ghost-progress-webpack-plugin.svg)](https://www.npmjs.com/package/ghost-progress-webpack-plugin)

A no side effects progress plugin for webpack.

Languages: [English](https://github.com/ZSkycat/ghost-progress-webpack-plugin#readme) | [中文](https://github.com/ZSkycat/ghost-progress-webpack-plugin/blob/master/README.zh.md)

## Feature
- Will not affect output from other tools
- Will not leave ugly output
- Not suitable for use in a CI environment (can use [simple-progress-webpack-plugin](https://github.com/dominique-mueller/simple-progress-webpack-plugin))

![preview-ghost](https://user-images.githubusercontent.com/20368649/42288692-5ee77a00-7fee-11e8-9480-eeac3469a8a8.gif)

## Get Started
#### Installation
```
npm install --save-dev ghost-progress-webpack-plugin
```

#### Usage
```javascript
// import
const GhostProgressWebpackPlugin = require('ghost-progress-webpack-plugin').GhostProgressWebpackPlugin;

// instantiate it in the webpack plugins configuration
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
**Type:** `'compact' | 'detailed' | 'bar'`<br>
**Default:** `'compact'`<br>

Set the output format.

`'compact'`
![compact](https://user-images.githubusercontent.com/20368649/42299306-0ae667fa-803d-11e8-984b-967353a51664.gif)

`'detailed'`
![detailed](https://user-images.githubusercontent.com/20368649/42288705-6b298f42-7fee-11e8-8110-73ce4e6eac68.gif)

`'bar'`
![bar](https://user-images.githubusercontent.com/20368649/42288706-7026daa4-7fee-11e8-9b76-d2c8064e3f2e.gif)

### options.stream
**Type:** `NodeJS.WriteStream`<br>
**Default:** `process.stderr`<br>

Set the write stream used by the output.

## License
[MIT](https://github.com/ZSkycat/ghost-progress-webpack-plugin/blob/master/LICENSE.txt)
