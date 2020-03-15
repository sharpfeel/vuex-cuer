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
type Func = (...args: any) => unknown;

/**
 * 函数通用类型集合
 */
interface FuncTree {
  [key: string]: Func;
}

interface IState<S> {
  state: S;
}

abstract class ICuer<T extends IState<unknown>> {
  protected state!: T["state"];
  protected store!: T;
}

/**
 * commit 方法集合
 */
export class Mutations<T extends IState<unknown>> extends ICuer<T> {}

/**
 * dispatch 方法集合
 */
export class Actions<T extends IState<unknown>> extends ICuer<T> {}

/**
 * 获取`ICuer`对象上的原链函数
 * @param obj
 */
function keys(obj?: ICuer<IState<unknown>>) {
  if (obj != null) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      v => v != "constructor"
    );
  }
  return [];
}

/**
 * commit方法扩展
 */
interface CommitEx<M> extends Commit {
  <T extends Extract<keyof M, string>>(
    key: T,
    payload: Parameters<Extract<M[T], Func>>[0]
  ): unknown;
}

/**
 * dispatch方法扩展
 */
interface DispatchEx<A> extends Dispatch {
  <T extends Extract<keyof A, string>>(
    key: T,
    payload: Parameters<Extract<A[T], Func>>[0]
  ): Promise<unknown>;
}

/**
 * getters方法扩展
 */
export type GettersEx<T extends FuncTree> = {
  [P in keyof T]: ReturnType<T[P]>;
};

/**
 * store 提示类
 */
export class StoreCuer<
  S,
  M extends Mutations<IState<unknown>>,
  A extends Actions<IState<unknown>>,
  G extends GetterTree<S, S>
> extends Store<S> {
  readonly commits!: M;
  readonly dispatchs!: A;

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
    type T = FuncTree;
    const mutations: MutationTree<S> = {};
    const _ms: T = {};
    const commits = options?.mutations;

    const actions: ActionTree<S, S> = {};
    const _as: T = {};
    const dispatchs = options?.actions;

    const commitKeys = keys(commits) as Extract<keyof M, string>[];

    if (commits) {
      commitKeys.forEach(key => {
        _ms[key] = (commits[key] as unknown) as Func;
        if (_ms[key]) {
          mutations[key] = (state: S, payload?: unknown) => {
            _ms[key].call(Object.assign(this.commits, { state }), payload);
          };
        }
      });
    }

    const dispatchKeys = keys(dispatchs) as Extract<keyof A, string>[];

    if (dispatchs) {
      dispatchKeys.forEach(key => {
        _as[key] = (dispatchs[key] as unknown) as Func;
        if (_as[key]) {
          actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
            _as[key].call(
              Object.assign(this.dispatchs, { state: injectee.state }),
              payload
            );
        }
      });
    }

    super({
      state: state,
      mutations,
      actions,
      getters: options?.getters
    });

    console.log("[vuex-cuer]", {
      state: state,
      mutations: commitKeys,
      actions: dispatchKeys
    });

    if (commits) {
      commitKeys.forEach(key => {
        if (commits[key] instanceof Function) {
          commits[key] = (((payload?: unknown) =>
            this.commit(key, payload)) as unknown) as M[Extract<
            keyof M,
            string
          >];
        }
      });
      if (options?.mutations) {
        this.commits = options.mutations;
        Object.assign(this.commits, {
          store: this
        });
      }
    }

    if (dispatchs) {
      dispatchKeys.forEach(key => {
        if (dispatchs[key] instanceof Function) {
          dispatchs[key] = (((payload?: unknown) =>
            this.dispatch(key, payload)) as unknown) as A[Extract<
            keyof A,
            string
          >];
        }
      });
      if (options?.actions) {
        this.dispatchs = options.actions;
        Object.assign(this.dispatchs, {
          store: this
        });
      }
    }
  }
}
