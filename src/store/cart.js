// import Vue from "vue";
// import store from "../store";

// Initial state
const state = {
  items: []
};

// Getters
const getters = {
  getItems(state) {
    return state.items;
  },
  cartItemCount(state) {
    return state.items.length;
  }
};
// Actions
const actions = {
  addItem({ commit }, payload) {
    commit("addItem", payload);
  },
  changeQuantity({ commit }, payload) {
    commit("changeQuantity", payload);
  }
};
// Mutations
const mutations = {
  addItem(state, payload) {
    state.items.push(payload);
  },
  changeQuantity(state, payload) {
    state.items.map(item => {
      if (item.productId === payload.productId) {
        item.quantity = payload.quantity;
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
