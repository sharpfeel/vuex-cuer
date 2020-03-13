import { Store } from "vuex";

export abstract class StoreBase<S, C, D> {
  readonly store: Store<S>;
  protected _commit: C;
  protected _dispatch: D;

  get commit() {
    return this._commit;
  }

  get dispatch() {
    return this._dispatch;
  }

  constructor(public state: S) {}
}

export type StoreFunc = (payload?: any) => any;

export interface StoreFuncTree {
  [key: string]: StoreFunc;
}

export class MixinBase<S> {
  constructor(protected cuer: S) {}
}

export class CuerMixin<
  S,
  SS extends StoreBase<S, unknown, unknown>
> extends MixinBase<SS> {
  constructor(cuer: SS) {
    super(cuer);
  }
  protected get store() {
    return this.cuer.store;
  }
  [key: string]: StoreFunc | Store<S> | SS;
}
