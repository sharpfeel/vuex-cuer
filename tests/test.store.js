/* eslint-disable no-unused-vars */
import Cuer from "../src/index";

const state = {
  /**
   * state.v
   */
  v: 1
};

/**
 * @extends Cuer.Mutations<TestCuer>
 */
class Mutations extends Cuer.Mutations {
  /**
   * test1
   */
  test1() {
    this.state.v++;
  }
}

/**
 * @extends Cuer.Actions<TestCuer>
 */
class Actions extends Cuer.Actions {
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
 * @type { Cuer.StoreCuer<State,Mutations,Actions,Getters> }
 */
const cuer = new Cuer.StoreCuer(state, {
  mutations: new Mutations(),
  actions: new Actions(),
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
