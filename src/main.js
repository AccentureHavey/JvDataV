import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import VueParticles from "vue-particles";
import VCharts from "v-charts";
import Vcomp from "./components/index";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/iconfont/iconfont.css";
import "./assets/css/global.scss";
import i18n from "./lang";
import VueI18n from "vue-i18n";
import { resolve, reject } from "_any-promise@1.3.0@any-promise";

Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(Vcomp);
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

let startApp = function() {
  return new Promise((resolve, reject) => {
    axios
      .get("./config.json")
      .then(res => {
        console.log(22222);
        console.log(res);
        // 基础地址
        let config = res.data;
        for (let key in config) {
          Vue.prototype[key] = config[key];
        }
        console.log(Vue.prototype.baseURL);
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject();
        reject();
      });
  });
};
async function init() {
  await startApp();
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount("#app");
}

init();
