module.exports = router => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("customer_jwt") != null) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next();
    }
  });
};
