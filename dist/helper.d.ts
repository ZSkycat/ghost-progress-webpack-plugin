/// <reference types="node" />
export declare class Helper {
    stream: NodeJS.WriteStream;
    xLength: number;
    yLength: number;
    clearLine(dir: number): void;
    cursorTo(x: number, y?: number): void;
    moveCursor(dx: number, dy?: number): void;
    showCursor(): void;
    hideCursor(): void;
    clearAll(): void;
    write(message: string, yLimit?: number): void;
    begin(): void;
    end(): void;
    beginWrite(): void;
    endWrite(): void;
}
export declare function parseDisplayLength(str: string, xLength?: number, xMax?: number): {
    xLength: number;
    yLength: number;
};
export declare function parseDisplayLengthAndLimit(str: string, yLimit: number, xLength?: number, xMax?: number): {
    str: string;
    xLength: number;
    yLength: number;
};
export declare function hookStdoutWrite(): void;
export declare function unhookStdoutWrite(): void;
