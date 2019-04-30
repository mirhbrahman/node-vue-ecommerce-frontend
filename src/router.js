import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import SingleProduct from "./views/SingleProduct.vue";
import ProductByCategory from "./views/ProductByCategory.vue";
import ProductBySubCategory from "./views/ProductBySubCategory.vue";
import Cart from "./views/Cart.vue";
import Checkout from "./views/Checkout.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/categories/:slug",
      props: true,
      name: "productByCategory",
      component: ProductByCategory
    },
    {
      path: "/sub-categories/:slug",
      props: true,
      name: "productBySubCategory",
      component: ProductBySubCategory
    },
    {
      path: "/products/:slug",
      props: true,
      name: "singleProduct",
      component: SingleProduct
    },
    {
      path: "/cart",
      name: "cartItem",
      component: Cart
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
// check route meta
require("./utils/metaChecker")(router);
export default router;
