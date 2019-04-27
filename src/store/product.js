import store from "../store";
import Vue from "vue";

// Initial state
const state = {
  products: {}
};
// Getters
const getters = {
  getProducts(state) {
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
          commit("setRecentProducts", res.data.products);
          // Clear all errors
          store.dispatch("error/clearErrors");
        } else {
          // Clear state
          commit("clearProduct");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
      });
  },
  getProductByCategory({ commit }, catSlug) {
    // Make server request
    Vue.axios
      .get(`product/categories/${catSlug}/products`)
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setProducts", res.data.products);
          // Clear all errors
          store.dispatch("error/clearErrors");
        } else {
          // Clear state
          commit("clearProduct");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
        // Clear state
        commit("clearProduct");
      });
  },
  getProductBySubCategory({ commit }, subCatSlug) {
    // Make server request
    Vue.axios
      .get(`product/sub-categories/${subCatSlug}/products`)
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setProducts", res.data.products);
          // Clear all errors
          store.dispatch("error/clearErrors");
        } else {
          // Clear state
          commit("clearProduct");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
        // Clear state
        commit("clearProduct");
      });
  }
};
// Mutations
const mutations = {
  setRecentProducts(state, products) {
    state.products = products;
  },
  setProducts(state, products) {
    state.products = products;
  },
  clearProduct(state) {
    state.products = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
