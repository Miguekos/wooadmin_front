// import something here

// "async" is optional
import el from "quasar/lang/el";
import { LocalStorage } from "quasar";

export default ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    // console.log(to, to);
    // console.log(from, from);
    // LocalStorage.set("loggin", false);
    // let logginIn = false;
    let logginIn = true;
    // let logginIn = LocalStorage.getAll().loggin;
    // console.log(logginIn);
    if (!logginIn && to.path !== "/auth") {
      // console.log(logginIn);
      // console.log("to.path", to.path);
      next("/auth");
    } else {
      next();
    }
  });
};
