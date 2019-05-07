import { AsyncFunc, Func, HookFunction, MochaGlobals } from './mocha-types';
export { Context } from './mocha-types';

const HANDLERS: Record<keyof MochaGlobals, Array<AsyncFunc | Func>> = {
    after: [],
    afterEach: [],
    before: [],
    beforeEach: [],
    setup: [],
    suiteSetup: [],
    suiteTeardown: [],
    teardown: []
};

export function useMochaHook (hookName: keyof MochaGlobals, handler: AsyncFunc | Func) {
    HANDLERS[hookName].push(handler);

    if (!Object.getOwnPropertyDescriptor(global, hookName).get) {
        let setHook: HookFunction;
        Object.defineProperty(global, hookName, {
            get (): HookFunction {
                return setHook;
            },
            set (hook: HookFunction): void {
                if (!setHook) {
                    HANDLERS[hookName].forEach(func => {
                        hook(func);
                    });
                }
                setHook = hook;
            }
        });
    }
}
