# vuex-cuer

### 简介
还在为 `vuex` 的魔法字符串而烦恼？还在为阅读项目里 `vuex` 相关的代码而头痛？<br>
如何一目了然的知道某个 `type` 的功能？定义常量字符串？
<br>
那如何快捷的定位到 `commit` 和 `dispatch` 的 `type` 的原函数，
<br>
你可以来试试 `vuex-cuer` ，纵享丝滑

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
store.dispatchs.xxx(payload?) //调用 dispatch
store.subscribe(fn) // （优化约束，以强化提示）
store.subscribeAction(fn) // （优化约束，以强化提示）
store.mapState({...}) // 映射 state
store.mapStateOfKeys(...) // 映射 state
store.mapGetters({...}) // 映射 getters
store.mapGettersOfKeys(...) // 映射 getters
store.mapActions({...}) // 映射 actions
store.mapActionsOfKeys(...) // 映射 actions
store.mapMutations({...}) // 映射 mutations
store.mapMutationsOfKeys(...) // 映射 mutations


```