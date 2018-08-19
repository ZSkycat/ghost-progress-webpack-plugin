"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const helper_1 = require("./helper");
// format:
// * █████_____
function createBar(options) {
    let helper = new helper_1.Helper(options.stream);
    let index = 0;
    return function (percentage, msg, moduleProgress, activeModules, moduleName) {
        if (percentage === 0)
            helper.begin();
        else if (percentage === 1)
            helper.end();
        helper.beginWrite();
        if (percentage != 1) {
            helper.write('\n');
            helper.write(createSpinnerStr(index) + ' ' + createBarStr(percentage));
            index++;
        }
        helper.endWrite();
    };
}
exports.createBar = createBar;
function createBarStr(percent, length = 100, fgColor = 'bgCyan', bgColor = 'bgBlackBright') {
    if (process.stdout.columns && process.stdout.columns < length + 2) {
        length = process.stdout.columns - 2;
    }
    let fgLength = Math.round(percent * length);
    let bgLength = length - fgLength;
    return chalk_1.default[fgColor](' '.repeat(fgLength)) + chalk_1.default[bgColor](' '.repeat(bgLength));
}
const spinner = ['-', '\\', '|', '/'];
function createSpinnerStr(index, color = 'cyan') {
    index = index % spinner.length;
    return chalk_1.default[color](spinner[index]);
}
//# sourceMappingURL=handler-bar.js.map