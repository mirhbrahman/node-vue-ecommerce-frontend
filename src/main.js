import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import jwtDecode from "vue-jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// Setup axios to be available globally through Vue
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/api"
});

// Check for token
if (localStorage.getItem("customer_jwt")) {
  // Getting token form local storage
  const bearerToken = localStorage.getItem("customer_jwt");
  // Set auth token to header auth
  setAuthToken(bearerToken);
  const tokenArray = bearerToken.split(" ");
  const token = tokenArray[1];
  // Decoded token
  const decoded = jwtDecode.decode(token);
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch("auth/logout");
    // Redirect to login
    router.push({ name: "login" });
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
