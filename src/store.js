import Vue from "vue";
import Vuex from "vuex";
import auth from "./store/auth";
import error from "./store/utils/error";
import loader from "./store/utils/loader";
import categories from "./store/category";
import subCategories from "./store/subCategory";
import products from "./store/product";
import cart from "./store/cart";
import checkout from "./store/checkout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    error,
    auth,
    categories,
    subCategories,
    products,
    cart,
    checkout
  },
  state: {},
  mutations: {},
  actions: {}
});
