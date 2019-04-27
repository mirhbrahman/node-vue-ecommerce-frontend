import Vue from "vue";
import Vuex from "vuex";
import error from "./store/utils/error";
import loader from "./store/utils/loader";
import categories from "./store/category";
import subCategories from "./store/subCategory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    error,
    categories,
    subCategories
  },
  state: {},
  mutations: {},
  actions: {}
});
