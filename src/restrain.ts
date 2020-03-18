import { Params, KeyOf } from "./type";
import { Dispatch, Commit, Payload } from "vuex";

/**
 * 约束 `commit`
 */
export interface CommitEx<M> extends Commit {
  <K extends keyof M>(key: K, payload: Params<M[K]>[0]): unknown;
}

/**
 * 约束 `dispatch`
 */
export interface DispatchEx<A> extends Dispatch {
  <K extends keyof A>(key: K, payload: Params<A[K]>[0]): Promise<unknown>;
}

/**
 * 约束 `subscribe` 和 `subscribeAction`
 */
export interface PayloadEx<M> extends Payload {
  type: KeyOf<M>;
  payload: unknown;
}
