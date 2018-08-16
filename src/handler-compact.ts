import c from 'chalk';
import { GhostProgressOptions } from '.';
import { Helper } from './helper';

// format:
// [00.00%] msg (moduleProgress :: activeModules :: moduleName)
export function createCompact(options: GhostProgressOptions) {
    let helper = new Helper(options.stream);
    return function(percentage: number, msg: string, moduleProgress?: string, activeModules?: string, moduleName?: string) {
        if (percentage === 0) helper.begin();
        else if (percentage === 1) helper.end();

        helper.beginWrite();
        if (percentage != 1) {
            let details = [moduleProgress, activeModules, moduleName].filter(x => x != undefined).join(' :: ');
            if (details.length > 0) details = c.gray(` (${details})`);
            helper.write('\n');
            helper.write(c.cyan(`[${(percentage * 100).toFixed(2)}%]`) + ` ${msg}` + details, 1);
        }
        helper.endWrite();
    };
}
