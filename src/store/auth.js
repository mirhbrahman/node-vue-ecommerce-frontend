import Vue from "vue";
import store from "../store";
import router from "../router";
import setAuthToken from "../utils/setAuthToken";

// Initial state
const state = {
  customer: {},
  isLoggedIn: false
};

// Getters
const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn;
  }
};
// Actions
const actions = {
  login({ commit }, payload) {
    // Active preloader
    store.dispatch("loader/activeLoader");
    // Make server request
    Vue.axios
      .post("/login", payload)
      .then(res => {
        if (res.data.success) {
          // Deactive preloader
          store.dispatch("loader/deactiveLoader");
          // Set token to local storage
          localStorage.setItem("customer_jwt", res.data.token);
          // Set auth token to header auth
          setAuthToken(localStorage.getItem("customer_jwt"));
          // Store customer to state
          commit("loginCustomer", res.data.customer);
          // Redirect customer
          router.push("/");
        }
      })
      .catch(err => {
        // Store errors
        store.dispatch("error/setErrors", err.response.data);
        // Deactive preloader
        store.dispatch("loader/deactiveLoader");
      });
  },
  register({ commit }, payload) {
    // Active preloader
    store.dispatch("loader/activeLoader");
    // Make server request
    Vue.axios
      .post("/register", payload)
      .then(res => {
        if (res.data.success) {
          // Deactive preloader
          store.dispatch("loader/deactiveLoader");
          // Redirect user to login
          router.push({ name: "login" });
        }
      })
      .catch(err => {
        // Store errors
        store.dispatch("error/setErrors", err.response.data);
        // Deactive preloader
        store.dispatch("loader/deactiveLoader");
      });
  },
  logout({ commit }) {
    if (localStorage.getItem("customer_jwt")) {
      localStorage.removeItem("customer_jwt");
      commit("clearCurrentCustomer");
      router.push({ name: "home" });
    }
  }
};
// Mutations
const mutations = {
  loginCustomer(state, payload) {
    state.customer = payload;
    state.isLoggedIn = true;
  },
  clearCurrentCustomer(state) {
    state.customer = null;
    state.isLoggedIn = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
