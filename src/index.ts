import Vuex, {
  ActionContext,
  ActionTree,
  MutationTree,
  Store,
  Dispatch,
  Commit,
  GetterTree,
  StoreOptions
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
  protected state!: T["state"];
  protected store!: T;
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
  [key: string]: (() => unknown) | T | T["state"];
}

/**
 * 获取`ICuer`对象上的原链函数
 * @param obj
 */
function keys<T>(obj?: T) {
  if (obj != null) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      v => v != "constructor"
    ) as Extract<keyof T, string>[];
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
  keys: Extract<keyof T, string>[],
  replace: (key: Extract<keyof T, string>, m: Method) => void
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
  keys: Extract<keyof T, string>[],
  write: (key: Extract<keyof T, string>) => unknown
) {
  if (obj != null) {
    keys.forEach(key => {
      obj[key] = write(key) as T[Extract<keyof T, string>];
    });
  }
}

/**
 * commit方法扩展
 */
interface CommitEx<M> extends Commit {
  <T extends Extract<keyof M, string>>(
    key: T,
    payload: Parameters<Extract<M[T], Method>>[0]
  ): unknown;
}

/**
 * dispatch方法扩展
 */
interface DispatchEx<A> extends Dispatch {
  <T extends Extract<keyof A, string>>(
    key: T,
    payload: Parameters<Extract<A[T], Method>>[0]
  ): Promise<unknown>;
}

/**
 * getters方法扩展
 */
type GettersEx<T extends ICuer> = {
  [P in keyof T]: ReturnType<Extract<T[P], Method>>;
};

/**
 * todo:subscribe
 * todo:subscribeAction
 * todo:registerModule
 * todo:unregisterModule
 *
 * todo:mapState
 * todo:mapGetters
 * todo:mapActions
 * todo:mapMutations
 *
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
}
