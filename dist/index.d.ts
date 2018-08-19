/// <reference types="node" />
import * as webpack from 'webpack';
export declare type GhostProgressFormat = 'compact' | 'detailed' | 'bar';
export interface GhostProgressOptions {
    format: GhostProgressFormat;
    stream: NodeJS.WriteStream;
}
export declare type GhostProgressOptionsInput = Partial<GhostProgressOptions>;
export interface GhostProgressConstructor {
    new (options?: GhostProgressOptionsInput | GhostProgressFormat): webpack.ProgressPlugin;
}
export declare const GhostProgressPlugin: GhostProgressConstructor;
