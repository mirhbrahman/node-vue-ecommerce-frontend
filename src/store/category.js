import Vue from "vue";
import store from "../store";

// Initial state
const state = {
  categories: {}
};

// Getters
const getters = {
  getCategories(state) {
    return state.categories;
  }
};
// Actions
const actions = {
  getCategories({ commit }) {
    // Activate loader
    store.dispatch("loader/activeLoader");
    // Make server request
    Vue.axios
      .get("/product/categories")
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setCategories", res.data.categories);
          // Clear errors
          store.dispatch("error/clearErrors");
        }
      })
      .catch(err => {
        // Store error to state
        store.dispatch("error/setErrors", err.response.data);
      });
  }
};
// Mutations
const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
    // Deactivate loader
    store.dispatch("loader/deactiveLoader");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
