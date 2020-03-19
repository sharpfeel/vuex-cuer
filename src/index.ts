import Vuex, {
  ActionContext,
  ActionTree,
  MutationTree,
  Store,
  StoreOptions,
  MutationPayload,
  ActionPayload,
  SubscribeActionOptions,
  ActionSubscriber
} from "vuex";

import {
  mapValueOfKeys,
  mapValueOfJson,
  mapMethodOfKeys,
  mapMethodOfJson
} from "./mapping";
import { keys, cover, rewrite, bindStore, bindState } from "./util";
import { PayloadEx, CommitEx, DispatchEx } from "./restrain";
import Vue from "vue";

Vue.use(Vuex);

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
 * dispatch 函数集合类
 */
export class Actions<T extends IState> extends ICuer<T> {
  //[key: string]: ((payload?: any) => unknown) | T | T["state"];
}

/**
 * dispatch 函数集合类
 */
export class Getters<T extends IState> extends ICuer<T> {
  //[key: string]: (() => unknown) | T | T["state"];
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
  readonly getters!: G;

  commit!: CommitEx<M>;
  dispatch!: DispatchEx<A>;

  constructor(
    state: S,
    options?: {
      /**
       * 继承 Mutations 的类的实例
       */
      mutations?: M;
      /**
       * 继承 Actions 的类的实例
       */
      actions?: A;
      /**
       * 继承 Getters 的类的实例
       */
      getters?: G;
      /**
       * StoreOptions.plugins
       */
      plugins?: StoreOptions<S>["plugins"];
      /**
       * StoreOptions.strict
       */
      strict?: StoreOptions<S>["strict"];
    }
  ) {
    const mutations: MutationTree<S> = {};
    const commits = options?.mutations;
    const commitKeys = keys(commits);
    cover(commits, commitKeys, (key, method) => {
      mutations[key] = (state: S, payload?: unknown) => {
        method.call(bindState(this.commits, state), payload);
      };
    });

    const actions: ActionTree<S, S> = {};
    const dispatchs = options?.actions;
    const dispatchKeys = keys(dispatchs);
    cover(dispatchs, dispatchKeys, (key, method) => {
      actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
        method.call(bindState(this.dispatchs, injectee.state), payload);
    });

    super({
      state: state,
      mutations,
      actions,
      //getters,
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
      this.commits = bindStore(commits, this);
    }

    rewrite(dispatchs, dispatchKeys, key => {
      return (payload?: unknown) => this.dispatch(key, payload);
    });

    if (dispatchs) {
      this.dispatchs = bindStore(dispatchs, this);
    }

    const getters = options?.getters;
    if (getters) {
      this.getters = bindStore(getters, this);
    }
  }

  subscribe<P extends MutationPayload = PayloadEx<M>>(
    fn: ActionSubscriber<P, S>
  ) {
    return super.subscribe(fn);
  }

  subscribeAction<P extends ActionPayload = PayloadEx<A>>(
    fn: SubscribeActionOptions<P, S>
  ) {
    return super.subscribeAction(fn);
  }

  /**
   * 映射 `state`
   * @param keys
   */
  mapState<V extends Record<keyof V, keyof S>>(keys: V) {
    return mapValueOfJson<S, V>(keys, k => () => this.state[k]);
  }

  /**
   * 映射 `state`
   * @param keys
   */
  mapStateOfKeys<V extends keyof S>(...keys: V[]) {
    return mapValueOfKeys<S, V>(keys, k => () => this.state[k]);
  }

  /**
   * 映射 `getters`
   * @param keys
   */
  mapGetters<V extends Record<keyof V, keyof G>>(keys: V) {
    return mapValueOfJson<G, V>(keys, k => () => this.getters[k]);
  }

  /**
   * 映射 `getters`
   * @param keys
   */
  mapGettersOfKeys<V extends keyof G>(...keys: V[]) {
    return mapValueOfKeys<G, V>(keys, key => () => this.getters[key]);
  }

  /**
   * 映射 `dispatchs`
   * @param keys
   */
  mapActions<V extends Record<keyof V, keyof A>>(keys: V) {
    return mapMethodOfJson<A, V>(keys, k => this.dispatchs[k]);
  }

  /**
   * 映射 `dispatchs`
   * @param keys
   */
  mapActionsOfKeys<V extends keyof A>(...keys: V[]) {
    return mapMethodOfKeys<A, V>(keys, k => this.dispatchs[k]);
  }

  /**
   * 映射 `commits`
   * @param keys
   */
  mapMutations<V extends Record<keyof V, keyof M>>(keys: V) {
    return mapMethodOfJson<M, V>(keys, k => this.commits[k]);
  }

  /**
   * 映射 `commits`
   * @param keys
   */
  mapMutationsOfKeys<V extends keyof M>(...keys: V[]) {
    return mapMethodOfKeys<M, V>(keys, key => this.commits[key]);
  }
}
