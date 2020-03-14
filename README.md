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
（请注意注释的规范）
```javascript
/* eslint-disable no-unused-vars */
import { Mutations, Actions, StoreCuer } from "vuex-cuer";

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
```
<br>

- 在 ts 中使用：创建一个`test.store.ts`文件
```typescript
import { Mutations, Actions, StoreCuer } from "vuex-cuer";

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

```
