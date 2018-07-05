import chalk from 'chalk';
import { Helper } from './helper';

// format:
// [00.00%] msg (moduleProgress :: activeModules :: moduleName)
export default function() {
    let helper = new Helper();
    return function(percentage: number, msg: string, moduleProgress?: string, activeModules?: string, moduleName?: string) {
        if (percentage === 0) helper.begin();
        else if (percentage === 1) helper.end();

        helper.beginWrite();
        if (percentage != 1) {
            let details = [moduleProgress, activeModules, moduleName].filter(x => x != undefined).join(' :: ');
            if (details.length > 0) details = chalk.gray(` (${details})`);
            helper.write('\n');
            helper.write(chalk.cyan(`[${(percentage * 100).toFixed(2)}%]`) + ` ${msg}` + details, 1);
        }
        helper.endWrite();
    };
}
