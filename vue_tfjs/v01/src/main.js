/*eslint-disable*/
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as tf from "@tensorflow/tfjs";

const app = createApp(App);

app.config.globalProperties.$tf = tf; //-> vue script에서 쓸 때는 this.$tf를 사용하여 끌어당김.

app.use(store).use(router).mount("#app");
