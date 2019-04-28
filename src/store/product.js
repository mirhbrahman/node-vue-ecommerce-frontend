import store from "../store";
import Vue from "vue";

// Initial state
const state = {
  products: {},
  product: {}
};
// Getters
const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return state.product;
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
  getProduct({ commit }, slug) {
    // Make server request
    Vue.axios
      .get(`/product/products/${slug}`)
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setProduct", res.data.product[0]);
          // Clear all errors
          store.dispatch("error/clearErrors");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
      });
  },
  getProductByCategory({ commit }, catSlug) {
    // Activate loader
    store.dispatch("loader/activeLoader");
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
          // Deactivate loader
          store.dispatch("loader/deactiveLoader");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
        // Clear state
        commit("clearProduct");
        // Deactivate loader
        store.dispatch("loader/deactiveLoader");
      });
  },
  getProductBySubCategory({ commit }, subCatSlug) {
    // Activate loader
    store.dispatch("loader/activeLoader");
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
          // Deactivate loader
          store.dispatch("loader/deactiveLoader");
        }
      })
      .catch(err => {
        // Set all errors to state
        store.dispatch("error/setErrors", err.response.data);
        // Clear state
        commit("clearProduct");
        // Deactivate loader
        store.dispatch("loader/deactiveLoader");
      });
  }
};
// Mutations
const mutations = {
  setRecentProducts(state, products) {
    state.products = products;
    // Deactivate loader
    store.dispatch("loader/deactiveLoader");
  },
  setProduct(state, product) {
    state.product = product;
  },
  setProducts(state, products) {
    state.products = products;
    // Deactivate loader
    store.dispatch("loader/deactiveLoader");
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
