<template>
  <div id="app">
    <div>
      module1.store.state.v：{{ value }}
      <button @click="onChange">刷新</button>
    </div>
  </div>
</template>
<script>
import Module1Store from "@/store/module1.store";
export default {
  data() {
    return {
      //...
    };
  },
  computed: {
    value() {
      return Module1Store.state.v;
    }
  },
  methods: {
    onChange() {
      Module1Store.commits.mutation1();
    }
  }
};
</script>
<style scoped></style>
