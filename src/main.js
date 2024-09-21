import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "./assets/style.css";

//Include vue toastification
const app = createApp(App);
app.use(Toast);
app.mount("#app");
