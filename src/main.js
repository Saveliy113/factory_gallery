import { createApp } from "vue";
import VueBlurHash from "another-vue3-blurhash";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI/index.js";

const app = createApp(App);

components.forEach((component) => {
  console.log(component);
  app.component(component.name, component);
});

app.use(store).use(router).use(VueBlurHash).mount("#app");
