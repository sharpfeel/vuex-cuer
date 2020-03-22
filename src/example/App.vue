<template>
  <div id="app">
    <div class="_content">
      <div class="_row">
        <code>
          <a class="str">"vuex-cuer"</a>
          <a class="note"
            >// 继承自vuex.Store， 支持通过函数调用commit、dispatch</a
          >
        </code>
        <br />
        <br />
        <br />
      </div>
      <div class="_result">
        <div class="_row">
          <code>
            <a>state</a>
            <a class="char">.</a>value
          </code>
          {{ stateV }}
          <code class="note">// state取值</code>
        </div>
        <div class="_row">
          <code>
            <a>getters</a>
            <a class="char">.</a>value
          </code>
          {{ getterV }}
          <code class="note">// getter取值</code>
        </div>
      </div>
      <div class="_row">
        <code>
          <a>commits</a>
          <a class="char">.</a>
          <a class="fun">addOne</a>
          <a class="char">()</a>
        </code>
        <button @click="commitsAdd">触发</button>
        <code class="note">// 通过commits调用add方法 +1</code>
      </div>

      <div class="_row">
        <code>
          <a>commit</a>
          <a class="char">(</a>
          <a class="str">"addOne"</a>
          <a class="char">)</a>
        </code>
        <button @click="commitAdd">触发</button>
        <code class="note">// 通过commit调用"add" +1</code>
      </div>

      <div class="_row">
        <code>
          <a>dispatchs</a>
          <a class="char">.</a>
          <a class="fun">delayAddOne</a>
          <a class="char">()</a>
        </code>
        <button @click="dispatchsAdd">触发</button>
        <code class="note">// 通过dispatchs调用delayAddOne方法 1秒后+1</code>
      </div>

      <div class="_row">
        <code>
          <a>dispatch</a>
          <a class="char">(</a>
          <a class="str">"delayAddOne"</a>
          <a class="char">)</a>
        </code>
        <button @click="dispatchAdd">触发</button>
        <code class="note">// 通过dispatch调用"delayAddOne" 1秒后+1</code>
      </div>
    </div>
  </div>
</template>
<script>
import exampleStore from "@/store/example.store";
export default {
  data() {
    return {
      //...
    };
  },
  computed: {
    stateV() {
      return exampleStore.state.value;
    },
    getterV() {
      return exampleStore.getters.value;
    },
    ...exampleStore.mapStateOfKeys("value")
  },
  methods: {
    commitsAdd() {
      this.$exampleStore.commits.addOne();
      //exampleStore.commits.addOne();
    },
    commitAdd() {
      exampleStore.commit("addOne");
    },
    dispatchsAdd() {
      exampleStore.dispatchs.delayAddOne();
    },
    dispatchAdd() {
      exampleStore.dispatch("delayAddOne");
    }
  }
};
</script>

<style>
body {
  background: #1e1e1e;
  color: #d4d4d4;
  font-size: 16px;
}
code {
  color: #8cdcfe;
  font-family: Consolas, "Courier New", monospace;
  margin-right: 10px;
}
code .char {
  color: #d4d4d4;
}
code .str {
  color: #ce9178;
}
code .fun {
  color: #dcdcaa;
}
.note {
  color: #6a9955;
  margin-left: 10px;
}
._content {
  width: 800px;
  padding: 50px;
  margin: auto;
}

._row {
  line-height: 2;
}

button {
  border: none;
  background: #4f4f4f;
  color: #fff;
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
}
button:hover {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
button:active {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
}
</style>
