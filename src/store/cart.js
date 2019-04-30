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
  },
  deleteItem({ commit }, productId) {
    commit("deleteItem", productId);
  }
};
// Mutations
const mutations = {
  addItem(state, payload) {
    // Check already this item contain in cart or not
    const contain = state.items.filter(
      item => item.productId === payload.productId
    );
    if (contain.length < 1) {
      state.items.push(payload);
    }
  },
  changeQuantity(state, payload) {
    state.items.map(item => {
      if (item.productId === payload.productId) {
        item.quantity = payload.quantity;
      }
    });
  },
  deleteItem(state, productId) {
    state.items = state.items.filter(item => item.productId !== productId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
