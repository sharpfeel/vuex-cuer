import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
  v: 1
};

type TestState = typeof state;

class TestMutations extends Mutations<TestCuer> {
  /**
   * 测试1
   */
  test1() {
    this.state.v++;
  }

  /**
   * 测试2
   */
  test2() {
    this.state.v += 2;
  }
}

class TestActions extends Actions<TestCuer> {
  test1() {
    this.state.v++;
  }

  test2() {
    this.state.v++;
    this.test1();
    this.cuer.commits.test1();
    this.cuer.commit("test1");
  }
}

class TestCuer extends StoreCuer<TestState, TestMutations, TestActions> {
  constructor() {
    super(state, {
      mutations: new TestMutations(),
      actions: new TestActions()
    });
  }
}

const cuer = new TestCuer();

export default cuer;
