import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
  v: 1
};

type TestState = typeof state;

class TestMutations extends Mutations<TestCuer> {
  test1() {
    //todo test1
  }
}

class TestActions extends Actions<TestCuer> {
  test2() {
    //todo
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
