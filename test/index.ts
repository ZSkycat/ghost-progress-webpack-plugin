import { outputData } from './data';
import { GhostProgressPlugin } from '../src/index';

async function invokeProgressPlugin(plugin: any) {
    for (let data of outputData) {
        await waitTime(50);
        plugin.handler(...data);
    }
}

async function waitTime(time: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}

describe('# Start Progress', function() {
    this.timeout(60 * 1000);

    it('format: compact', async function() {
        let plugin = new GhostProgressPlugin('compact');
        await invokeProgressPlugin(plugin);
    });

    it('format: detailed', async function() {
        let plugin = new GhostProgressPlugin('detailed');
        await invokeProgressPlugin(plugin);
    });

    it('format: bar', async function() {
        let plugin = new GhostProgressPlugin('bar');
        await invokeProgressPlugin(plugin);
    });
});
