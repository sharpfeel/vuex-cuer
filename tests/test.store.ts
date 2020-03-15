import * as Cuer from "../src/index";

const state = {
  /**
   * state.v
   */
  v: 1
};

class Mutations extends Cuer.Mutations<TestStore> {
  /**
   * mutation1
   */
  mutation1() {
    this.state.v++; //操作state
  }

  /**
   * mutation2
   */
  mutation2(v: number) {
    this.state.v += v; //操作state
    this.mutation1(); //调用同级函数
    this.store.commits.mutation1(); //通过commits调用同级函数
    this.store.commit("mutation1"); //通过commit函数调用同级函数
  }
}

class Actions extends Cuer.Actions<TestStore> {
  /**
   * action1
   */
  action1() {
    this.state.v++;
  }

  /**
   * action2
   */
  action2() {
    this.state.v++;
    this.action1();
    this.store.commits.mutation2(1);
    this.store.commit("mutation1");
    this.store.dispatch("test2");
  }
}

const getters = {
  /**
   * getters.v
   */
  v: () => 1
};

class TestStore extends Cuer.StoreCuer<
  typeof state,
  Mutations,
  Actions,
  typeof getters
> {
  constructor() {
    super(state, {
      mutations: new Mutations(),
      actions: new Actions(),
      getters
    });
  }
}

const store = new TestStore();

store.dispatchs.action1(); //通过store调用

export default store;
