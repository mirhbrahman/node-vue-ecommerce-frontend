import store from "../store";
import Vue from "vue";
import router from "../router";

// Initial state
const state = {};
// Getters
const getters = {};
// Actions
const actions = {
  setCheckout({ commit }, payload) {
    // Make server request
    Vue.axios
      .post("/product/checkout", payload)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.charge);
          // Clear cart
          store.dispatch("cart/clearCart");
          // Redirect to completed page
          router.push({ name: "orderCompleted" });
          // Clear all errors
          store.dispatch("error/clearErrors");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
      });
  }
};
// Mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
