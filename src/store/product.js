import store from "../store";
import Vue from "vue";

// Initial state
const state = {
  products: {}
};
// Getters
const getters = {
  getRecentProducts(state) {
    return state.products;
  }
};
// Actions
const actions = {
  getRecentProducts({ commit }) {
    // Make server request
    Vue.axios
      .get("/product/products?perPage=8")
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setRecentProduct", res.data.products);
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
const mutations = {
  setRecentProduct(state, products) {
    state.products = products;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
