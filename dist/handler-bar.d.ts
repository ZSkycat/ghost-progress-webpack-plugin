import { GhostProgressOptions } from '.';
export declare function createBar(options: GhostProgressOptions): (percentage: number, msg: string, moduleProgress?: string | undefined, activeModules?: string | undefined, moduleName?: string | undefined) => void;
