import Vue from "vue";
import Vuex, { ActionContext, MutationTree, ActionTree, Store } from "vuex";

Vue.use(Vuex);

export type StoreMixin<T> = { store: T };
export type StoreFunc<T> = (this: StoreMixin<T>, payload?: unknown) => unknown;
export interface StoreFuncs<T> {
  [key: string]: StoreFunc<T>;
}

export interface Getters {
  [key: string]: unknown;
}

/**
 * store
 */
export default class StoreCuer<
  S,
  M extends StoreFuncs<StoreCuer<S, M, A, G>>,
  A extends StoreFuncs<StoreCuer<S, M, A, G>>,
  G extends Getters
> {
  private store: Store<S>;
  readonly commit: M & StoreMixin<StoreCuer<S, M, A, G>>;
  readonly dispatch: A & StoreMixin<StoreCuer<S, M, A, G>>;
  public getters!: G;

  get state() {
    return this.store.state;
  }

  constructor(options: {
    state: S | (() => S);
    mutations?: M;
    actions?: A;
    //getters?: G;
  }) {
    type T = StoreFuncs<StoreCuer<S, M, A, G>>;
    const mutations: MutationTree<S> = {};
    const _ms: T = {};
    const commits: T = options.mutations || {};

    const actions: ActionTree<S, S> = {};
    const _as: T = {};
    const dispatchs: T = options.actions || {};

    if (commits) {
      for (const key in commits) {
        _ms[key] = commits[key];
        mutations[key] = (state: S, payload?: unknown) =>
          _ms[key].call({ store: this }, payload);
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        _as[key] = dispatchs[key];
        actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
          _as[key].call({ store: this }, payload);
      }
    }

    this.store = new Store({
      state: options.state,
      mutations,
      actions
    });

    if (options.mutations) {
      for (const key in commits) {
        commits[key] = (payload?: unknown) => this.store.commit(key, payload);
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        dispatchs[key] = (payload?: unknown) =>
          this.store.dispatch(key, payload);
      }
    }

    this.commit = Object.assign(options.mutations, { store: this });
    this.dispatch = Object.assign(options.actions, { store: this });
    //this.getters = options.getters;
  }
}
