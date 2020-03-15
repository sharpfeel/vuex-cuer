/* eslint-disable no-unused-vars */
import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
  /**
   * state.v
   */
  v: 1
};

/**
 * @extends Mutations<TestCuer>
 */
class TestMutations extends Mutations {
  /**
   * test1
   */
  test1() {
    this.state.v++;
  }
}

/**
 * @extends Actions<TestCuer>
 */
class TestActions extends Actions {
  /**
   * test2
   */
  test2() {
    this.state.v++;
    this.store.commits.test1();
    this.store.commit("test1");
  }
}

const getters = {
  /**
   * getters.v
   */
  v: () => 1
};

/**
 * @type { StoreCuer<State,TestMutations,TestActions,Getters> }
 */
const cuer = new StoreCuer(state, {
  mutations: new TestMutations(),
  actions: new TestActions(),
  getters
});

cuer.dispatchs.test2();
cuer.dispatch("test2");

export default cuer;

/**
 * @typedef { typeof state } State
 */
/**
 * @typedef { typeof getters } Getters
 */
/**
 * @typedef { typeof cuer } TestCuer
 */
