import Vue from "vue";
import Vuex, { ActionContext, MutationTree, ActionTree, Store } from "vuex";

Vue.use(Vuex);

export type StoreMixin<T> = { cuer: T };
export type StoreFunc<T> = (this: StoreMixin<T>, payload?: any) => any;
export interface StoreFuncs<T> {
  [key: string]: StoreFunc<T>;
}

export interface Getters {
  [key: string]: any;
}

/**
 * store
 */
export default abstract class StoreCuer<S, M, A> {
  private store: Store<S>;
  readonly commit: M;
  readonly dispatch: A;

  get state() {
    return this.store.state;
  }

  constructor(options: { state: S | (() => S) }) {
    type T = StoreFuncs<StoreCuer<S, M, A>>;
    const mutations: MutationTree<S> = {};
    const _ms: T = {};
    const commits: T = this.mutations || {};

    const actions: ActionTree<S, S> = {};
    const _as: T = {};
    const dispatchs: T = this.actions || {};

    if (commits) {
      for (const key in commits) {
        _ms[key] = commits[key];
        mutations[key] = (state: S, payload?: any) =>
          _ms[key].call({ cuer: this }, payload);
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        _as[key] = dispatchs[key];
        actions[key] = (injectee: ActionContext<S, S>, payload?: any) =>
          _as[key].call({ cuer: this }, payload);
      }
    }

    this.store = new Store({
      state: options.state,
      mutations,
      actions
    });

    if (this.mutations) {
      for (const key in commits) {
        commits[key] = (payload?: any) => this.store.commit(key, payload);
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        dispatchs[key] = (payload?: any) => this.store.dispatch(key, payload);
      }
    }

    this.commit = Object.assign(this.mutations, { cuer: this });
    this.dispatch = Object.assign(this.actions, { cuer: this });
  }

  protected get mutations(): M {
    return undefined;
  }

  protected get actions(): A {
    return undefined;
  }
}
