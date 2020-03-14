/* eslint-disable no-unused-vars */
import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
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
    //todo test1
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
    //todo test2
    this.cuer.commit.test1();
  }
}

/**
 * @type { StoreCuer<State,TestMutations,TestActions> }
 */
const cuer = new StoreCuer(state, {
  mutations: new TestMutations(),
  actions: new TestActions()
});

export default cuer;

/**
 * @typedef { typeof state } State
 */
/**
 * @typedef { typeof cuer } TestCuer
 */
