# vuex-cuer

### 简介
Vuex的 `commit` 和 `dispatch` 没有友好的提示，大项目难以维护。如何避免，使用 `vuex-cuer`
<br>

### 示例

[example](https://gitee.com/sharp-feel/vuex-cuer/tree/master/src/example)

### 效果
1. 推荐直接通过`commits`调用函数，因为这样有能查看到原函数的注释<br><br>
![Image text](./result/1.png)<br>

2. 兼容`commit`函数调用，并且优化了提示<br><br>
![Image text](./result/2.png)<br>
<br>

### 用法
1. class `Mutations`
```typescript
class Mutations extends Cuer.Mutations<ExampleStore> {

  test(){
    this.state.xxx //访问 state
    this.store.getters.xxx //访问 getter
    this.xxx //访问同一个类的函数
    this.store.commit("xxx") //调用commit
    this.store.commits.xxx //调用commit
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
    this.xxx //访问同一个类的函数
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
class Actions extends Cuer.Actions<ExampleStore> {

  test(){
    this.state.xxx //访问 state
    this.getters.xxx //访问 getter
    this.xxx //访问同一个类的getter （还有瑕疵）
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
store.commit("xxx", payload?) //调用 commit（优化约束，以供代码提示）
store.commits.xxx(payload?) //调用 commit
store.dispatch("xxx", payload?) //调用 dispatch（优化约束，以供代码提示）
store.dispatchs.xxx(payload?) //调用 dispatchs
store.subscribe(fn) // （优化约束，以供代码提示）
store.subscribeAction(fn) // （优化约束，以供代码提示）
store.mapState(...keys) // （优化约束，以供代码提示）
store.mapGetters(...keys) // （优化约束，以供代码提示）
store.mapActions(...keys) // （优化约束，以供代码提示）
store.mapMutations(...keys) // （优化约束，以供代码提示）

// 注：mapState、mapGetters、mapActions、mapMutations 暂未找到精确约束的方法

```