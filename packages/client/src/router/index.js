import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from '../store';


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// // Before each route evaluates...
router.beforeResolve((routeTo, routeFrom, next) => {
  store.dispatch('menuOpen', false);
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  // If auth isn't required for the route, just continue.
  if (!authRequired) {
    return next();
  } else {
    return store.dispatch('validate').then((loggedIn) => {
      loggedIn ? next() : redirectToLogin();
    });
  }

  function redirectToLogin() {
    next({ path: '/login' })
  }
})

export default router;