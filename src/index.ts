import Vuex, { ActionContext, ActionTree, MutationTree, Store } from "vuex";
import Vue from "vue";

Vue.use(Vuex);

interface IState<S> {
  state: S;
}

type Func = (payload?: unknown) => unknown;

interface FuncTree {
  [key: string]: Func;
}

abstract class ICuer<T extends IState<unknown>> {
  protected state!: T["state"];
  protected cuer!: T;
}

/**
 * commit 方法集合
 */
export class Mutations<T extends IState<unknown>> extends ICuer<T> {}

/**
 * dispatch 方法集合
 */
export class Actions<T extends IState<unknown>> extends ICuer<T> {}

function keys(obj?: ICuer<IState<unknown>>) {
  if (obj != null) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      v => v != "constructor"
    );
  }
  return [];
}

/**
 * store 提示类
 */
export class StoreCuer<
  S,
  M extends Mutations<IState<unknown>>,
  A extends Actions<IState<unknown>>
> {
  readonly store!: Store<S>;
  readonly commits!: M;
  readonly dispatchs!: A;
  constructor(
    readonly state: S,
    options?: {
      mutations?: M;
      actions?: A;
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
      const commitScope = Object.assign(commits, {
        cuer: this
      });

      commitKeys.forEach(key => {
        _ms[key] = (commits[key] as unknown) as Func;
        if (_ms[key]) {
          mutations[key] = (state: S, payload?: unknown) => {
            _ms[key].call(Object.assign(commitScope, { state }), payload);
          };
        }
      });
    }

    const dispatchKeys = keys(dispatchs) as Extract<keyof A, string>[];

    if (dispatchs) {
      const dispatchScope = Object.assign(dispatchs, {
        cuer: this
      });
      dispatchKeys.forEach(key => {
        _as[key] = (dispatchs[key] as unknown) as Func;
        if (_as[key]) {
          actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
            _as[key].call(
              Object.assign(dispatchScope, { state: injectee.state }),
              payload
            );
        }
      });
    }

    this.store = new Store({
      state: state,
      mutations,
      actions
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
            this.store.commit(key, payload)) as unknown) as M[Extract<
            keyof M,
            string
          >];
        }
      });
      if (options?.mutations) {
        this.commits = options.mutations;
      }
    }

    if (dispatchs) {
      dispatchKeys.forEach(key => {
        if (dispatchs[key] instanceof Function) {
          dispatchs[key] = (((payload?: unknown) =>
            this.store.dispatch(key, payload)) as unknown) as A[Extract<
            keyof A,
            string
          >];
        }
      });
      if (options?.actions) {
        this.dispatchs = options.actions;
      }
    }
  }

  commit(key: Extract<keyof M, string>, payload?: unknown) {
    return this.store.commit(key, payload);
  }

  dispatch(key: Extract<keyof A, string>, payload?: unknown) {
    return this.store.dispatch(key, payload);
  }
}
