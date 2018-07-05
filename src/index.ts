import * as webpack from 'webpack';

export type GhostProgressFormat = 'compact' | 'detailed' | 'bar';

export interface GhostProgressPluginType {
    new (): webpack.ProgressPlugin;
    new (format: GhostProgressFormat): webpack.ProgressPlugin;
}

export const GhostProgressPlugin = (function(arg?: GhostProgressFormat) {
    let format = arg ? arg : 'compact';
    let handler: any;
    switch (format) {
        case 'compact':
            handler = require('./handler-compact').default();
            break;
        case 'detailed':
            handler = require('./handler-detailed').default();
            break;
        case 'bar':
            handler = require('./handler-bar').default();
            break;
    }
    return new webpack.ProgressPlugin(handler);
} as any) as GhostProgressPluginType;
