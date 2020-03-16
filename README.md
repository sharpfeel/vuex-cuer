# vuex-cuer

### 简介
`Vuex` 的 `commit` 和 `dispatch` 没有友好的提示，大项目难以维护。如何避免，使用 `vuex-cuer`
<br>

### 示例

[`demo`](https://gitee.com/sharp-feel/vuex-cuer/tree/master/src/example)<br>
[`js`中的写法](https://gitee.com/sharp-feel/vuex-cuer/tree/master/tests/test.store.js)<br>
[`ts`中的写法](https://gitee.com/sharp-feel/vuex-cuer/tree/master/tests/test.store.ts)

### 效果
1. 推荐直接通过`commits`调用函数，因为这样有能查看到原函数的注释<br><br>
![Image text](https://gitee.com/sharp-feel/vuex-cuer/raw/master/result/1.png)<br>

2. 兼容`commit`函数调用，并且优化了提示<br><br>
![Image text](https://gitee.com/sharp-feel/vuex-cuer/raw/master/result/2.png)<br>
<br>

### 用法
1. class `Mutations`
```typescript
class Mutations extends Cuer.Mutations<ExampleStore> {

  test(){
    this.state.xxx //访问 state
    this.store.getters.xxx //访问 getter
    this.xxx //调用当前类的 commit
    this.store.commit("xxx") //调用 commit
    this.store.commits.xxx //调用 commit
  }
}
```
<br>

2. class `Actions`
```typescript
class Actions extends Cuer.Actions<ExampleStore> {

  test(){
    this.state.xxx //访问 state
    this.store.getters.xxx //访问 getter
    this.xxx //调用当前类的 dispatch
    this.store.commit("xxx", payload?) //调用 commit
    this.store.commits.xxx(payload?) //调用 commit
    this.store.dispatch("xxx", payload?) //调用 dispatch
    this.store.dispatchs.xxx(payload?) //调用 dispatchs
  }
}

```
<br>

3. class `Getters`
```typescript
class Getters extends Cuer.Actions<ExampleStore> {
  //使用访问器来实现 getter
  get test() {
    this.state.xxx //访问 state
    this.getters.xxx //访问 getter
    this.xxx //访问当前类的 getter

    return xxx;
  }
}

```
<br>

4. class `StoreCuer`
```typescript
// `StoreCuer` 继承自 `vuex` 的 `Store`，支持除 `module` 之外的大部分内容

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

store.state.xxx //访问 state
store.getters.xxx //访问 getter
store.xxx //访问 Store 的函数
store.commit("xxx", payload?) //调用 （优化约束，以强化提示）
store.commits.xxx(payload?) //调用 commit
store.dispatch("xxx", payload?) //调用 （优化约束，以强化提示）
store.dispatchs.xxx(payload?) //调用 dispatchs
store.subscribe(fn) // （优化约束，以强化提示）
store.subscribeAction(fn) // （优化约束，以强化提示）
store.mapState(...keys) // （优化约束，以强化提示）
store.mapGetters(...keys) // （优化约束，以强化提示）
store.mapActions(...keys) // （优化约束，以强化提示）
store.mapMutations(...keys) // （优化约束，以强化提示）

// 注：mapState、mapGetters、mapActions、mapMutations 暂未找到精确约束的方法

```