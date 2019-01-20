import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store/store";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/signin");
  } else if (to.name == "signin" && store.getters.isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});
export default router;
