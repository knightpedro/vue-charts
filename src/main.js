import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import registerDirectives from "./directives";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

Vue.config.productionTip = false;

Vue.use(Buefy);
registerDirectives(Vue);

new Vue({
  render(h) {
    return h(App);
  },
}).$mount("#app");
