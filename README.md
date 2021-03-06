# vuex-cuer

### 简介
还在为 `vuex` 的魔法字符串而烦恼？还在为阅读项目里 `vuex` 相关的代码而头痛？<br>
如何一目了然的知道某个 `type` 的功能？定义字符串常量加以注释 或者 使用`d.ts`文件进行注释？
那如何快捷的定位到 `commit` 和 `dispatch` 相应的`type` 的原函数？
<br>
你可以来试试 `vuex-cuer` ，纵享丝滑

### 地址
[`github`](https://github.com/sharpfeel/vuex-cuer)&nbsp;
[`码云`](https://gitee.com/sharp-feel/vuex-cuer)&nbsp;
[`npm`](https://www.npmjs.com/package/vuex-cuer)&nbsp;

### 示例

[`demo`](https://gitee.com/sharp-feel/vuex-cuer/tree/master/src/example)&nbsp;
[`js`中的写法](https://gitee.com/sharp-feel/vuex-cuer/tree/master/tests/test.store.js)&nbsp;
[`ts`中的写法](https://gitee.com/sharp-feel/vuex-cuer/tree/master/tests/test.store.ts)&nbsp;

将项目 `clone` 下来之后执行 `npm run dev` 即可启动 `demo` ，当然前提是你已经初始化了。

### 效果
1. 推荐直接通过`commits`调用函数，因为这样有能查看到原函数的注释

    ![Image text](https://gitee.com/sharp-feel/vuex-cuer/raw/master/md/1.png)

2. 兼容`commit`函数调用，并且优化了提示

    ![Image text](https://gitee.com/sharp-feel/vuex-cuer/raw/master/md/2.png)
    <br>

### 诞生
1. 由来

    这个库的诞生是因为我实在受不了接手的这个项目里的 `vuex` 相关的代码，阅读起来令我头皮发麻<br>
    于是我决定使用 `Typescript` 基于 `vuex` 来封装一个有类型约束的库。


2. 结构

    但是在设计之初我遇到了`循环引用`的问题，场景是：定义一个 `store` 对象的时候参数有 `mutations` 等等，然后需要在 `mutations` 的函数中访问 `store` 对象，如以下代码：

    ```typescript
    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        add (state) {
          state.count++
          store.xxx
        }
      }
    });
    ```

    问题在于这个时候 `store` 还没出生，如何在 `add` 方法中使用 `store` 呢？
    最终我确定了一个思路：以 `Store` 的类为核心，通过泛型关联其他四个属性 `State`、`Mutations`、`Actions`、`Getters`，如下结构：

    ![Image text](https://gitee.com/sharp-feel/vuex-cuer/raw/master/md/structure.png)


    然后还是这个问题，如何在 `add` 方法中使用 `store`？既然把 `Mutations` 封装成了类，可以把 `store` 这个对象绑定到 `Mutations` 的实例的 `this` 上面，于是就有了这个约束：
    ```typescript
    abstract class ICuer<T> {
      protected readonly store!: T;
    }
    ```
        
    这便是 `Mutations`、`Actions`、`Getters` 的基类。<br>
    但是这样还不够，`state` 对象也应该关联上，正好一起绑上去，这样同一个 `Mutations` 的函数互相访问可以省略第一个参数 `state`：
    ```typescript
    interface IState<S = unknown> {
      state: S;
    }

    abstract class ICuer<T extends IState = IState> {
      protected readonly state!: T["state"];
      protected readonly store!: T;
    }
    ```

    于是乎就实现了：
    ```typescript
    class Mutations extends ICuer<ExampleStore> {
      /**
       * 加 `1`
      */
      addOne() {
        this.add(1);
      }

      /**
       * 加 `v`
      */
      add(v: number) {
        this.state.value += v;
        this.store.xxx
      }
    }
    ```

    同理可得 `Actions` 和 `Getters`。<br>
    当然 `Getters` 有点区别，他下面的是属性，这并无大碍，构造的时候用 `get` 属性访问器就行了。<br><br>
    最后就是 `Store` 类的继承了，`Store`类 需要知道`State`、`Mutations`、`Actions`、`Getters`这四个属性的类型，所以通过泛型来约束：
    ```typescript
    class StoreCuer<
      S,
      M extends ICuer = ICuer,
      A extends ICuer = ICuer,
      G extends ICuer = ICuer
    > extends Store<S> {
      constructor(
        state: S,
        options?: {
          mutations?: M;
          actions?: A;
          getters?: G;
          plugins?: StoreOptions<S>["plugins"];
          strict?: StoreOptions<S>["strict"];
        }
      )
    }
    ```

    然后把这些类型对应到相应的属性：
    ```typescript
    class StoreCuer<
      S,
      M extends ICuer = ICuer,
      A extends ICuer = ICuer,
      G extends ICuer = ICuer
    > extends Store<S> {
      readonly commits!: M;
      readonly dispatchs!: A;
      readonly getters!: G;
    }
    ```
    这样就实现了：
    ```typescript
    const store = new StoreCuer();

    store.getters.xxx //访问 getter
    store.commits.xxx(payload?) //调用 commit
    store.dispatchs.xxx(payload?) //调用 dispatch

    ```
    <br>
    结构就基本Ok了，剩下的就是代码逻辑的实现了。


3. 优化

    结构和代码逻辑实现了之后就是 `vuex` 原有的一些如 `commit` 、 `dispatch` 、 `subscribe` 、 `subscribeAction` 、 `mapState` 、`mapGetters` 等函数添加类型约束了。

    - `commit` 函数的优化

        先重写 `interface Commit`
        ```typescript
        //函数通用类型
        type Method = (...args: unknown[]) => unknown;

        //解析函数的参数
        type Params<T> = Parameters<Extract<T, Method>>;

        //继承 `vuex` 的 `Commit` 接口并添加约束
        interface CommitEx<M> extends Commit {
          <K extends keyof M>(key: K, payload: Params<M[K]>[0]): unknown;
        }
        ```
    
        在 `StoreCuer` 类中重新定义 `commit` 的类型：

        ```typescript
        class StoreCuer<
          S,
          M extends ICuer = ICuer,
          A extends ICuer = ICuer,
          G extends ICuer = ICuer
        > extends Store<S> {
          commit!: CommitEx<M>;
        }
        ```
        `dispatch` 同理可得
    
    - `mapState` 函数的优化
    
        `vuex` 的 `mapState` 是全局的，他取的是`vue`实例化时的入口中的 `$store`。但是我们既然构造了一个 `store` 的类，就可以直接在类中实现`mapState`。
        在这里我实现了两种映射（由于混合类型的约束没有达到我想要的精确约束的效果，如果有好的方法各位大佬可以指点一下），一种是参数是 `json` 格式的
        ```typescript
        class StoreCuer<
          S,
          M extends ICuer = ICuer,
          A extends ICuer = ICuer,
          G extends ICuer = ICuer
        > extends Store<S> {
          mapState<V extends Record<keyof V, keyof S>>(keys: V) {
            return mapValueOfJson<S, V>(keys, k => () => this.state[k]);
          }
        }
        ```
        另一种是接收字符串数组的参数

        ```typescript
        class StoreCuer<
          S,
          M extends ICuer = ICuer,
          A extends ICuer = ICuer,
          G extends ICuer = ICuer
        > extends Store<S> {
          mapStateOfKeys<V extends keyof S>(...keys: V[]) {
            return mapValueOfKeys<S, V>(keys, k => () => this.state[k]);
          }
        }
        ```

4. 最后

    暂时没有实现 `module` 和 命名空间，因为目前的东西对于我来说是够用的。如果需要统一一个 `store` 的入口可以这样写：
    ```typescript
    // store/test1.store.ts 文件
    //...
    export default test1Store;

    // store/test2.store.ts 文件
    //...
    export default test2Store;

    // store/index.ts 文件
    import test1Store from "./test1.store.ts";
    import test2Store from "./test2.store.ts";

    export default {
      test1Store,
      test2Store
    };

    ```

    如果要把 `index.ts` 的对象绑定到全局的 `vue` 对象上可以这样写：
    ```typescript
    import storeCuer from "./store/index.ts";

    Vue.prototype.$storeCuer = storeCuer;

    //类型约束
    declare module 'vue/types/vue' {
      interface Vue {
        $storeCuer: typeof storeCuer;
      }
    }
    ```

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

    export default store;


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