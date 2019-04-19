import { AsyncFunc, Func, HookFunction, MochaGlobals } from './mocha-types';
export { Context } from './mocha-types';

export function useMochaHook (hookName: keyof MochaGlobals, func: AsyncFunc | Func) {
    let setHook: HookFunction;
    Object.defineProperty(global, hookName, {
        get (): HookFunction {
            return setHook;
        },
        set (hook: HookFunction): void {
            if (!setHook) {
                hook(func);
            }
            setHook = hook;
        }
    });
}
