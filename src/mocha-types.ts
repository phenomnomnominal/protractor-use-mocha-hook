export interface HookFunction {
    (fn: Func | AsyncFunc): void;
    (name: string, fn?: Func | AsyncFunc): void;
}

export interface Runnable {
    title: string;
    fn: Func | AsyncFunc | undefined;
    body: string;
    async: boolean;
    sync: boolean;
    timedOut: boolean;
    pending: boolean;
    duration?: number;
    parent?: Suite;
    state?: 'failed' | 'passed';
    timer?: any;
    ctx?: Context;
    callback?: Done;
    allowUncaught?: boolean;
    file?: string;
    timeout (): number;
    timeout (ms: string | number): this;
    slow (): number;
    slow (ms: string | number): this;
    enableTimeouts (): boolean;
    enableTimeouts (enabled: boolean): this;
    skip (): never;
    isPending (): boolean;
    isFailed (): boolean;
    isPassed (): boolean;
    retries (): number;
    retries (n: number): void;
    fullTitle (): string;
    titlePath (): Array<string>;
    clearTimeout (): void;
    inspect (): string;
    resetTimeout (): void;
    globals (): Array<string>;
    globals (globals: ReadonlyArray<string>): void;
    run (fn: Done): void;
}
export interface Context {
    test?: Runnable;
    currentTest?: Test;
    runnable (): Runnable;
    runnable (runnable: Runnable): this;
    timeout (): number;
    timeout (ms: string | number): this;
    enableTimeouts (): boolean;
    enableTimeouts (enabled: boolean): this;
    slow (): number;
    slow (ms: string | number): this;
    skip (): never;
    retries (): number;
    retries (n: number): this;
    [key: string]: any;
}

export interface Suite {
    ctx: Context;
    suites: Array<Suite>;
    tests: Array<Test>;
    pending: boolean;
    file?: string;
    root: boolean;
    delayed: boolean;
    parent: Suite | undefined;
    title: string;
    clone (): Suite;
    timeout (): number;
    timeout (ms: string | number): this;
    retries (): number;
    retries (n: string | number): this;
    enableTimeouts (): boolean;
    enableTimeouts (enabled: boolean): this;
    slow (): number;
    slow (ms: string | number): this;
    bail (): boolean;
    bail (bail: boolean): this;
    isPending (): boolean;
    beforeAll (fn?: Func | AsyncFunc): this;
    beforeAll (title: string, fn?: Func | AsyncFunc): this;
    afterAll (fn?: Func | AsyncFunc): this;
    afterAll (title: string, fn?: Func | AsyncFunc): this;
    beforeEach (fn?: Func | AsyncFunc): this;
    beforeEach (title: string, fn?: Func | AsyncFunc): this;
    afterEach (fn?: Func | AsyncFunc): this;
    afterEach (title: string, fn?: Func | AsyncFunc): this;
    addSuite (suite: Suite): this;
    addTest (test: Test): this;
    fullTitle (): string;
    titlePath (): Array<string>;
    total (): number;
    eachTest (fn: (test: Test) => void): this;
    run (): void;
}

interface Test extends Runnable {
    type: 'test';
    speed?: 'slow' | 'medium' | 'fast';
    err?: Error;
    clone (): Test;
}

type Done = (err?: any) => void;
export type Func = (this: Context, done: Done) => void;
export type AsyncFunc = (this: Context) => PromiseLike<any>;

export interface MochaGlobals {
    before: HookFunction;
    after: HookFunction;
    beforeEach: HookFunction;
    afterEach: HookFunction;
    suiteSetup: HookFunction;
    suiteTeardown: HookFunction;
    setup: HookFunction;
    teardown: HookFunction;
}
