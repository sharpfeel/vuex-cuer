import Vue from "vue";
import App from "./App.vue";
import exampleStore from "@/store/example.store.ts";

Vue.config.productionTip = false;
Vue.prototype.$exampleStore = exampleStore;

new Vue({
  render: h => h(App)
}).$mount("#app");

declare module "vue/types/vue" {
  interface Vue {
    $exampleStore: typeof exampleStore;
  }
}
