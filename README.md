# vuex-cuer

### 简介
Vuex的 `commit` 和 `dispatch` 没有友好的提示，大项目难以维护。如何避免，使用 `vuex-cuer`
<br>

### 安装
```
//npm
npm install vuex-cuer

//yarn
yarn install vuex-cuer
```
<br>

### 使用
- 在 js （`es6`） 中使用：创建一个`test.store.js`文件
（请注意`jsdoc`注释的规范）
```javascript
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


```
<br>

- 在 ts 中使用：创建一个`test.store.ts`文件
```typescript
import { Mutations, Actions, StoreCuer } from "../src/index";

const state = {
  /**
   * state.v
   */
  v: 1
};

class TestMutations extends Mutations<TestStore> {
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

class TestActions extends Actions<TestStore> {
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

class TestStore extends StoreCuer<
  typeof state,
  TestMutations,
  TestActions,
  typeof getters
> {
  constructor() {
    super(state, {
      mutations: new TestMutations(),
      actions: new TestActions(),
      getters
    });
  }
}

const store = new TestStore();

store.commits.mutation1(); //通过store调用

export default store;


```
