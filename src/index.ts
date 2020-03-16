import Vuex, {
  ActionContext,
  ActionTree,
  MutationTree,
  Store,
  Dispatch,
  Commit,
  GetterTree,
  StoreOptions,
  MutationPayload,
  ActionPayload,
  SubscribeActionOptions,
  ActionSubscriber
} from "vuex";

import Vue from "vue";

Vue.use(Vuex);

/**
 * 函数通用类型
 */
type Method = (...args: unknown[]) => unknown;

/**
 * 函数通用类型集合
 */
export interface Methods {
  [key: string]: Method;
}

export interface IState<S = unknown> {
  state: S;
}

export abstract class ICuer<T extends IState = IState> {
  protected readonly state!: T["state"];
  protected readonly store!: T;
}

/**
 * commit 方法集合类
 */
export class Mutations<T extends IState> extends ICuer<T> {
  //[key: string]: ((payload?: any) => unknown) | T | T["state"];
}

/**
 * dispatch 方法集合类
 */
export class Actions<T extends IState> extends ICuer<T> {
  //[key: string]: ((payload?: any) => unknown) | T | T["state"];
}

/**
 * dispatch 方法集合类
 */
export class Getters<T extends IState> extends ICuer<T> {
  //[key: string]: (() => unknown) | T | T["state"];
}

type KeyOf<T> = Extract<keyof T, string>;

/**
 * 获取`ICuer`对象上的原链函数
 * @param obj
 */
function keys<T>(obj?: T) {
  if (obj != null) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      v => v != "constructor"
    ) as KeyOf<T>[];
  }
  return [];
}

/**
 * 覆盖 ICuer 对象，转换成 store 属性的类型
 * @param obj
 * @param keys
 */
function cover<T>(
  obj: T | undefined,
  keys: KeyOf<T>[],
  replace: (key: KeyOf<T>, m: Method) => void
) {
  if (obj != null) {
    const ms: Methods = {};
    keys.forEach(key => {
      ms[key] = (obj[key] as unknown) as Method;
      if (ms[key]) {
        replace(key, ms[key]);
      }
    });
  }
}

//绑定store
function bind<T, V>(cuer: T, value: V) {
  Object.assign(value, {
    store: cuer
  });
  return value;
}

/**
 * 重写 对象 属性
 */
function rewrite<T>(
  obj: T | undefined,
  keys: KeyOf<T>[],
  write: (key: KeyOf<T>) => unknown
) {
  if (obj != null) {
    keys.forEach(key => {
      obj[key] = write(key) as T[KeyOf<T>];
    });
  }
}

function map<T, R>(keys: (keyof T)[], callback: (key: keyof T) => R) {
  const rets = {} as { [K in keyof T]: R };
  keys.forEach(key => {
    rets[key] = callback(key);
  });
  return rets;
}

type Params<T> = Parameters<Extract<T, Method>>;

/**
 * commit方法扩展
 */
interface CommitEx<M> extends Commit {
  <K extends keyof M>(key: K, payload: Params<M[K]>[0]): unknown;
}

/**
 * dispatch方法扩展
 */
interface DispatchEx<A> extends Dispatch {
  <K extends keyof A>(key: K, payload: Params<A[K]>[0]): Promise<unknown>;
}

/**
 * getters方法扩展
 */
type GettersEx<T> = {
  [K in keyof T]: ReturnType<Extract<T[K], Method>>;
};

interface Payload<M extends ICuer> {
  type: KeyOf<M>;
  payload: unknown;
}

/**
 * todo:registerModule
 * todo:unregisterModule
 */

/**
 * store 提示类
 */
export class StoreCuer<
  S,
  M extends ICuer = ICuer,
  A extends ICuer = ICuer,
  G extends ICuer = ICuer
> extends Store<S> {
  readonly commits!: M;
  readonly dispatchs!: A;
  private _getters!: G;

  commit!: CommitEx<M>;
  dispatch!: DispatchEx<A>;
  getters!: GettersEx<G>;

  constructor(
    state: S,
    options?: {
      mutations?: M;
      actions?: A;
      getters?: G;
      plugins?: StoreOptions<S>["plugins"];
      strict?: StoreOptions<S>["strict"];
    }
  ) {
    const mutations: MutationTree<S> = {};
    const commits = options?.mutations;
    const commitKeys = keys(commits);
    cover(commits, commitKeys, (key, method) => {
      mutations[key] = (state: S, payload?: unknown) => {
        method.call(Object.assign(this.commits, { state }), payload);
      };
    });

    const actions: ActionTree<S, S> = {};
    const dispatchs = options?.actions;
    const dispatchKeys = keys(dispatchs);
    cover(dispatchs, dispatchKeys, (key, method) => {
      actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
        method.call(
          Object.assign(this.dispatchs, { state: injectee.state }),
          payload
        );
    });

    const _getters = options?.getters;
    const getters: GetterTree<S, S> = {};
    const getterkeys = keys(options?.getters);
    cover(_getters, getterkeys, (key, method) => {
      getters[key] = (state: S) =>
        method.call(Object.assign(this._getters, { state }));
    });

    super({
      state: state,
      mutations,
      actions,
      getters,
      plugins: options?.plugins,
      strict: options?.strict
    });

    console.log("[vuex-cuer]", {
      state: state,
      mutations: commitKeys,
      actions: dispatchKeys
    });

    rewrite(commits, commitKeys, key => {
      return (payload?: unknown) => this.commit(key, payload);
    });

    if (commits) {
      this.commits = bind(this, commits);
    }

    rewrite(dispatchs, dispatchKeys, key => {
      return (payload?: unknown) => this.dispatch(key, payload);
    });

    if (dispatchs) {
      this.dispatchs = bind(this, dispatchs);
    }

    if (_getters) {
      this._getters = bind(this, _getters);
    }
  }

  subscribe<P extends MutationPayload = Payload<M>>(
    fn: ActionSubscriber<P, S>
  ) {
    return super.subscribe(fn);
  }

  subscribeAction<P extends ActionPayload = Payload<A>>(
    fn: SubscribeActionOptions<P, S>
  ) {
    return super.subscribeAction(fn);
  }

  /**
   * 映射 `state`
   * @param keys
   */
  mapState(...keys: (keyof S)[]) {
    return map(keys, key => () => this.state[key]);
  }

  /**
   * 映射 `getters`
   * @param keys
   */
  mapGetters(...keys: (keyof G)[]) {
    return map(keys, key => () => this.getters[key]);
  }

  /**
   * 映射 `dispatchs`
   * @param keys
   */
  mapActions(...keys: (keyof A)[]) {
    return map(keys, key => this.dispatchs[key]);
  }

  /**
   * 映射 `commits`
   * @param keys
   */
  mapMutations(...keys: (keyof M)[]) {
    return map(keys, key => this.commits[key]);
  }
}
