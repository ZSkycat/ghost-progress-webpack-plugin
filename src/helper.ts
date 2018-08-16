import * as cjk from 'cjk-regex';
import * as readline from 'readline';
const ansi = require('ansi-regex');
const cliCursor = require('cli-cursor');

export class Helper {
    stream: NodeJS.WriteStream;
    xLength = 0;
    yLength = 0;

    constructor(stream: NodeJS.WriteStream) {
        this.stream = stream;
    }

    clearLine(dir: number) {
        readline.clearLine(this.stream, dir);
    }

    cursorTo(x: number, y?: number) {
        readline.cursorTo(this.stream, x, y);
    }

    moveCursor(dx: number, dy: number = 0) {
        readline.moveCursor(this.stream, dx, dy);
    }

    showCursor() {
        cliCursor.show(this.stream);
    }

    hideCursor() {
        cliCursor.hide(this.stream);
    }

    clearAll() {
        for (let i = 0; i < this.yLength; i++) {
            this.stream.write('\n'); // 当光标位于最底部时, moveCursor(0, 1) 无效
            this.clearLine(0);
        }
        this.moveCursor(0, -this.yLength);
    }

    write(message: string, yLimit?: number) {
        if (yLimit == undefined) {
            let result = parseDisplayLength(message, this.xLength, this.stream.columns);
            this.xLength = result.xLength;
            this.yLength += result.yLength;
            this.stream.write(message);
        } else {
            let result = parseDisplayLengthAndLimit(message, yLimit, this.xLength, this.stream.columns);
            this.xLength = result.xLength;
            this.yLength += result.yLength;
            this.stream.write(result.str);
        }
    }

    begin() {
        this.hideCursor();
        hookStdoutWrite();
    }

    end() {
        this.showCursor();
        unhookStdoutWrite();
    }

    beginWrite() {
        this.clearAll();
        this.xLength = 0;
        this.yLength = 1;
        this.stream.write('\n');
    }

    endWrite() {
        this.moveCursor(0, -this.yLength);
        this.cursorTo(0);
    }
}

// TODO https://github.com/chalk/ansi-regex/pull/24
const ansiRegexG: RegExp = ansi();
const ansiRegex = new RegExp(ansiRegexG.source);
const cjkRegex = cjk().toRegExp();

export function parseDisplayLength(str: string, xLength: number = 0, xMax: number = 128) {
    let yLength = 0;
    str = str.replace(ansiRegexG, '');
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let code = str.codePointAt(i)!;
        if (code > 0xffff) {
            char = String.fromCodePoint(code);
            i += 1;
        }

        if (char === '\r') {
            xLength = 0;
        } else if (char === '\n') {
            xLength = 0;
            yLength += 1;
        } else {
            if (cjkRegex.test(char)) {
                xLength += 2;
            } else {
                xLength += 1;
            }

            if (xLength > xMax) {
                xLength -= xMax;
                yLength += 1;
            }
        }
    }
    return { xLength, yLength };
}

export function parseDisplayLengthAndLimit(str: string, yLimit: number, xLength: number = 0, xMax: number = 128) {
    let newStr = '';
    let yLength = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let code = str.codePointAt(i)!;
        if (code > 0xffff) {
            char = String.fromCodePoint(code);
            i += 1;
        }

        if (char === '\u001b' || char === '\u009b') {
            let sub = str.substring(i);
            let match = sub.match(ansiRegex);
            if (match && match.index === 0) {
                i += match[0].length - 1;
                newStr += match[0];
            } else {
                newStr += char;
            }
        } else if (char === '\r') {
            xLength = 0;
            newStr += char;
        } else if (char === '\n') {
            if (yLength + 1 < yLimit) {
                xLength = 0;
                yLength += 1;
                newStr += char;
            } else {
                continue; // 不使用 break 是为了防止 ANSI 转义序列被截断引发颜色污染
            }
        } else {
            if (cjkRegex.test(char)) {
                xLength += 2;
            } else {
                xLength += 1;
            }

            if (xLength > xMax) {
                if (yLength + 1 < yLimit) {
                    if (xLength - xMax === 0) xLength = 0;
                    else xLength = 2;
                    yLength += 1;
                } else {
                    continue;
                }
            }
            newStr += char;
        }
    }
    return { str: newStr, xLength, yLength };
}

let stdoutWrite: any;
export function hookStdoutWrite() {
    if (stdoutWrite == undefined) {
        stdoutWrite = process.stdout.write;
        process.stdout.write = handleStdoutWrite as any;
    }
}

export function unhookStdoutWrite() {
    if (stdoutWrite != undefined) {
        process.stdout.write = stdoutWrite;
        stdoutWrite = undefined;
    }
}

// 帮助其他程序清理控制台，避免进度字符的残留
function handleStdoutWrite() {
    let stream = process.stderr;
    let str = arguments[0];
    if (typeof str === 'string') {
        if (str.includes('\n')) {
            let result = parseDisplayLength(str, 0, stream.columns);
            readline.clearLine(stream, 1);
            for (let i = 0; i < result.yLength; i++) {
                stream.write('\n');
                readline.clearLine(stream, 0);
            }
            readline.moveCursor(stream, 0, -result.yLength);
        } else {
            readline.clearLine(stream, 1);
        }
    }
    stdoutWrite.apply(process.stdout, arguments);
    if (typeof str === 'string') readline.clearLine(stream, 1);
}
