import { ActionContext, ActionTree, MutationTree, Store } from "vuex";

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

export class Mutations<T extends IState<unknown>> extends ICuer<T> {
  [key: string]: Func | T["state"] | T;
}

export class Actions<T extends IState<unknown>> extends ICuer<T> {
  [key: string]: Func | T["state"] | T;
}

export class StoreCuer<
  S,
  M extends Mutations<IState<unknown>>,
  A extends Actions<IState<unknown>>
> {
  readonly store!: Store<S>;
  readonly commit!: M;
  readonly dispatch!: A;
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

    if (commits) {
      for (const key in commits) {
        _ms[key] = commits[key] as Func;
        if (_ms[key]) {
          mutations[key] = (state: S, payload?: unknown) =>
            _ms[key].call(
              {
                state,
                commit: this.commit,
                dispatch: this.dispatch
              },
              payload
            );
        }
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        _as[key] = dispatchs[key] as Func;
        if (_as[key]) {
          actions[key] = (injectee: ActionContext<S, S>, payload?: unknown) =>
            _as[key].call(
              {
                state: injectee.state,
                commit: this.commit,
                dispatch: this.dispatch
              },
              payload
            );
        }
      }
    }

    this.store = new Store({
      state: state,
      mutations,
      actions
    });

    if (commits) {
      for (const key in commits) {
        if (commits[key] as Func) {
          commits[key] = ((payload?: unknown) =>
            this.store.commit(key, payload)) as M[Extract<keyof M, string>];
        }
      }
      if (options?.mutations) {
        this.commit = options.mutations;
      }
    }

    if (dispatchs) {
      for (const key in dispatchs) {
        if (dispatchs[key] as Func) {
          dispatchs[key] = ((payload?: unknown) =>
            this.store.dispatch(key, payload)) as A[Extract<keyof A, string>];
        }
      }
      if (options?.actions) {
        this.dispatch = options.actions;
      }
    }
  }
}
