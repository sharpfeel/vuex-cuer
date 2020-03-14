import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
  v: 1
};

type TestState = typeof state;

class TestMutations extends Mutations<TestCuer> {
  test1() {
    this.state.v++;
  }
}

class TestActions extends Actions<TestCuer> {
  test2() {
    this.state.v++;
    this.cuer.commit.test1();
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
