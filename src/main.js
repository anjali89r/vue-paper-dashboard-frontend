import Vue from "vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router/index";
import store from "./store/store";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
Vue.use(ElementUI, { locale });
Vue.use(PaperDashboard);

Vue.prototype.$baseURL = "http://localhost:8000";
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
