import { createApp } from "vue";
import main from "./main.vue";
import i18n from "./lang/index";
import { router } from "./router";
import "./components/web3";
import "./components/typeConfig";
import dire from "./components/directive";

const app = createApp(main);
app.use(i18n);
app.use(router);
app.use(dire);
app.mount("#app");
