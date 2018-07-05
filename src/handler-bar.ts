import chalk from 'chalk';
import { Helper } from './helper';

const spinner = ['-', '\\', '|', '/'];

function createBarStr(percent: number, length: number = 100, fgColor: string = 'bgCyan', bgColor: string = 'bgBlackBright') {
    if (process.stdout.columns && process.stdout.columns < length + 2) {
        length = process.stdout.columns - 2;
    }
    let fgLength = Math.round(percent * length);
    let bgLength = length - fgLength;
    return chalk[fgColor](' '.repeat(fgLength)) + chalk[bgColor](' '.repeat(bgLength));
}

function createSpinnerStr(index: number, color: string = 'cyan') {
    index = index % spinner.length;
    return chalk[color](spinner[index]);
}

// format:
// * █████_____
export default function() {
    let helper = new Helper();
    let index = 0;
    return function(percentage: number, msg: string, moduleProgress?: string, activeModules?: string, moduleName?: string) {
        if (percentage === 0) helper.begin();
        else if (percentage === 1) helper.end();

        helper.beginWrite();
        if (percentage != 1) {
            helper.write('\n');
            helper.write(createSpinnerStr(index) + ' ' + createBarStr(percentage));
            index++;
        }
        helper.endWrite();
    };
}
