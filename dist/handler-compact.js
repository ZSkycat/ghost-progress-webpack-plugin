"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const helper_1 = require("./helper");
// format:
// [00.00%] msg (moduleProgress :: activeModules :: moduleName)
function createCompact(options) {
    let helper = new helper_1.Helper(options.stream);
    return function (percentage, msg, moduleProgress, activeModules, moduleName) {
        if (percentage === 0)
            helper.begin();
        else if (percentage === 1)
            helper.end();
        helper.beginWrite();
        if (percentage != 1) {
            let details = [moduleProgress, activeModules, moduleName].filter(x => x != undefined).join(' :: ');
            if (details.length > 0)
                details = chalk_1.default.gray(` (${details})`);
            helper.write('\n');
            helper.write(chalk_1.default.cyan(`[${(percentage * 100).toFixed(2)}%]`) + ` ${msg}` + details, 1);
        }
        helper.endWrite();
    };
}
exports.createCompact = createCompact;
//# sourceMappingURL=handler-compact.js.map