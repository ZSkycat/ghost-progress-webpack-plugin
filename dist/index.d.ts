import * as webpack from 'webpack';
export declare type GhostProgressFormat = 'compact' | 'detailed' | 'bar';
export interface GhostProgressConstructor {
    new (): webpack.ProgressPlugin;
    new (format: GhostProgressFormat): webpack.ProgressPlugin;
}
export declare const GhostProgressPlugin: GhostProgressConstructor;
