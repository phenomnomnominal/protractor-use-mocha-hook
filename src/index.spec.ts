// Dependencies:
import { equal } from 'assert';
import { describe } from 'mocha';
import { AsyncFunc, HookFunction } from './mocha-types';

import { useMochaHook } from './index';

describe('useMochaHook', () => {
    it('should run a hook once it has been attached', () => {
        const afterEach = global.afterEach;
        global.afterEach = null;

        let called = 0;
        // HACK:
        // Use `function` so `this` is set by Mocha correctly:
        // tslint:disable-next-line:only-arrow-functions
        useMochaHook('afterEach', function () {
            called += 1;
        });

        // HACK:
        // Use `function` so `this` is set by Mocha correctly:
        // tslint:disable-next-line:only-arrow-functions
        global.afterEach = function (func: AsyncFunc): void {
            func.call(this);
        } as HookFunction;

        equal(called, 1);

        global.afterEach = afterEach;
    });

    it('should not run a hook if it is never attached', () => {
        const afterEach = global.afterEach;
        global.afterEach = null;

        let called = 0;
        // HACK:
        // Use `function` so `this` is set by Mocha correctly:
        // tslint:disable-next-line:only-arrow-functions
        useMochaHook('afterEach', function () {
            called += 1;
        });

        equal(called, 0);

        global.afterEach = afterEach;
    });

    it('should let you attach multiple handlers to the same hook', () => {
        const setup = global.setup;
        global.setup = null;

        let called = 0;
        // HACK:
        // Use `function` so `this` is set by Mocha correctly:
        // tslint:disable-next-line:only-arrow-functions
        useMochaHook('setup', function () {
            called += 1;
        });
        // tslint:disable-next-line:only-arrow-functions
        useMochaHook('setup', function () {
            called += 1;
        });

        // HACK:
        // Use `function` so `this` is set by Mocha correctly:
        // tslint:disable-next-line:only-arrow-functions
        global.setup = function (func: AsyncFunc): void {
            func.call(this);
        } as HookFunction;

        equal(called, 2);

        global.setup = setup;
    });
});
