import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/scss/base.scss";
import "./assets/scss/vars.scss";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
