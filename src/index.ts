import * as webpack from 'webpack';
import { createBar } from './handler-bar';
import { createCompact } from './handler-compact';
import { createDetailed } from './handler-detailed';

export type GhostProgressFormat = 'compact' | 'detailed' | 'bar';

export interface GhostProgressOptions {
    format: GhostProgressFormat;
    stream: NodeJS.WriteStream;
}

export type GhostProgressOptionsInput = Partial<GhostProgressOptions>;

export interface GhostProgressConstructor {
    new (options?: GhostProgressOptionsInput | GhostProgressFormat): webpack.ProgressPlugin;
}

export const GhostProgressPlugin = (Main as any) as GhostProgressConstructor;

function Main(options?: GhostProgressOptionsInput | GhostProgressFormat) {
    let opt: GhostProgressOptions = {
        format: 'compact',
        stream: process.stderr,
    };
    if (typeof options === 'string') opt.format = options;
    else Object.assign(opt, options);

    let handler: any;
    switch (opt.format) {
        case 'bar':
            handler = createBar(opt);
            break;
        case 'compact':
            handler = createCompact(opt);
            break;
        case 'detailed':
            handler = createDetailed(opt);
            break;
        default:
            throw new Error('Can not find options.format.');
    }
    return new webpack.ProgressPlugin(handler);
}
