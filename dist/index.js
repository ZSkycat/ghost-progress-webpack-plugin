"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
exports.GhostProgressPlugin = function (arg) {
    let format = arg ? arg : 'compact';
    let handler;
    switch (format) {
        case 'compact':
            handler = require('./handler-compact').default();
            break;
        case 'detailed':
            handler = require('./handler-detailed').default();
            break;
        case 'bar':
            handler = require('./handler-bar').default();
            break;
    }
    return new webpack.ProgressPlugin(handler);
};
//# sourceMappingURL=index.js.map