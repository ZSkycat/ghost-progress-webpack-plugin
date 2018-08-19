"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
const handler_bar_1 = require("./handler-bar");
const handler_compact_1 = require("./handler-compact");
const handler_detailed_1 = require("./handler-detailed");
exports.GhostProgressPlugin = Main;
function Main(options) {
    let opt = {
        format: 'compact',
        stream: process.stderr,
    };
    if (typeof options === 'string')
        opt.format = options;
    else
        Object.assign(opt, options);
    let handler;
    switch (opt.format) {
        case 'bar':
            handler = handler_bar_1.createBar(opt);
            break;
        case 'compact':
            handler = handler_compact_1.createCompact(opt);
            break;
        case 'detailed':
            handler = handler_detailed_1.createDetailed(opt);
            break;
        default:
            throw new Error('Can not find options.format.');
    }
    return new webpack.ProgressPlugin(handler);
}
//# sourceMappingURL=index.js.map