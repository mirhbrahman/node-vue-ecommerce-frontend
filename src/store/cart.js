import Vue from "vue";
import store from "../store";

// Initial state
const state = {
  items: []
};

// Getters
const getters = {
  getItems(state) {
    return state.items;
  },
  cartItemCount(state){
    return state.items.length;
  }
};
// Actions
const actions = {
  addItem({ commit }, payload) {
    commit("addItem", payload);
  }
};
// Mutations
const mutations = {
  addItem(state, payload) {
    state.items.push(payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
