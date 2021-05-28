import router from "./";
import store from "../store";

export default [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
    beforeEnter: (_, __, next) => {
      store.dispatch("validate").then((loggedIn) => {
        loggedIn ? router.push("/okrs") : next();
      });
    },
  },
  {
    path: "/performance",
    name: "Performance",
    component: () =>
      import(/* webpackChunkName: "Performance" */ "../views/Placeholder.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "Settings" */ "../views/Settings.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () =>
      import(/* webpackChunkName: "Tasks" */ "../views/Placeholder.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/Signup.vue"),
    beforeEnter: (_, __, next) => {
      store.dispatch("validate").then((loggedIn) => {
        loggedIn ? router.push("/okrs") : next();
      });
    },
  },
  {
    path: "/password-reset/:token",
    name: "NewPassword",
    component: () =>
      import(
        /* webpackChunkName: "NewPasswordForm" */ "@/components/molecules/NewPasswordForm.vue"
      ),
    beforeEnter: (routeTo, __, next) => {
      const token = routeTo.params.token;
      const user = routeTo.query.user;
      const payload = { token, user };
      store.dispatch("validateRequestToken", payload).then((res) => {
        if (res.status === 200) next();
        else if (res.response.status === 401) {
          router.push({
            name: "PasswordReset",
            props: true,
            params: { tokenValidated: false },
          });
        }
      });
    },
  },
  {
    path: "/password-reset",
    name: "PasswordReset",
    component: () =>
      import(
        /* webpackChunkName: "PasswordReset" */ "@/components/molecules/PasswordResetForm"
      ),
  },
  {
    path: "/okrs/okr",
    name: "Okr",
    component: () => import("../views/Okr.vue"),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "/okrs/okr/new",
        name: "NewOkr",
        component: () =>
          import(
            /* webpackChunkName: "CreateOkr" */ "@/components/organisms/CreateOkr"
          ),
      },
      {
        path: "/okrs/okr/:id",
        name: "OkrById",
        component: () =>
          import(/* webpackChunkName: "Okr" */ "@/components/organisms/Okr"),
        beforeEnter: (routeTo, __, next) => {
          if (store.state.okrs.currentOkrData === null) {
            store.dispatch("getOkr", routeTo.params.id);
            next();
          } else {
            next();
          }
        },
      },
    ],
  },
  {
    path: "/okrs",
    name: "Okrs",
    component: () =>
      import(
        /* webpackChunkName: "OkrDashboard" */ "@/components/organisms/OkrDashboard"
      ),
    meta: {
      authRequired: true,
    },
    beforeEnter: (_, __, next) => {
      if (store.state.okrs.allOkrData.length === 0) {
        store.dispatch("getOkrs");
        next();
      } else {
        next();
      }
    },
  },
  {
    path: "/login-success",
    name: "LoginSuccess",
    beforeEnter: (routeTo, __, next) => {
      if (routeTo.query.authorized) {
        store.dispatch("setAuthorized", true);
        store.dispatch("setUserData", routeTo.query).then(() => {
          next({ name: "Okrs" });
        });
      }
    },
  },
];
