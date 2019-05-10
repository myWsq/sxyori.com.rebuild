import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DayJsPlugin } from "./plugins/day";

import ElementUI from "element-ui";
import TheToolbar from "./components/TheToolbar.vue";
import TheContent from "./components/TheContent.vue";
import QUploader from "./components/QUploader.vue";

import "./styles.scss";

Vue.use(ElementUI);
Vue.use(DayJsPlugin);
Vue.component("TheToolbar", TheToolbar);
Vue.component("TheContent", TheContent);
Vue.component("QUploader", QUploader);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
