import * as Cuer from "vuex-cuer";

const state = {
  /**
   * some note.
   */
  value: 1,
  value2: 2
};

class Mutations extends Cuer.Mutations<ExampleStore> {
  /**
   * 加 `1`
   */
  addOne() {
    this.add(1);
  }

  /**
   * 减 `1`
   */
  add(v: number) {
    this.state.value += v;
  }
}

class Actions extends Cuer.Actions<ExampleStore> {
  /**
   * `1` 秒后加1
   */
  delayAddOne() {
    return this.delayAdd({
      second: 1,
      value: 1
    });
  }

  /**
   * `second` 秒后加 `value`
   */
  delayAdd(data: { second: number; value: number }) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.store.commits.addOne();
        resolve();
      }, 1000 * data.second);
    });
  }
}

class Getters extends Cuer.Getters<ExampleStore> {
  /**
   * some note...
   */
  value() {
    return state.value;
  }
}

class ExampleStore extends Cuer.StoreCuer<
  typeof state,
  Mutations,
  Actions,
  Getters
> {
  constructor() {
    super(state, {
      mutations: new Mutations(),
      actions: new Actions(),
      getters: new Getters()
    });
  }
}

const store = new ExampleStore();

export default store;
