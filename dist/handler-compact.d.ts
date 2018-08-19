import { GhostProgressOptions } from '.';
export declare function createCompact(options: GhostProgressOptions): (percentage: number, msg: string, moduleProgress?: string | undefined, activeModules?: string | undefined, moduleName?: string | undefined) => void;
