import Vue from "vue";
import store from "../store";

// Initial state
const state = {
  subCategories: {}
};

// Getters
const getters = {
  getSubCategories(state) {
    return state.subCategories;
  }
};
// Actions
const actions = {
  getSubCategories({ commit }) {
    // Make server request
    Vue.axios
      .get("/product/sub-categories")
      .then(res => {
        if (res.data.success) {
          // Store data to state
          commit("setSubCategories", res.data.subCategories);
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
  setSubCategories(state, subCategories) {
    state.subCategories = subCategories;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
