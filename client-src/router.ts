import { Router } from "@vaadin/router";

// Init router. Set routes
const outlet = document.querySelector(".root");
const router = new Router(outlet);
router.setRoutes([
  { path: "/home", component: "custom-home" },
  { path: "/", redirect: "/home" },
  { path: "/login", component: "custom-login" },
  { path: "/signup", component: "custom-signup" },
  { path: "/mis-cuentas", component: "custom-mis-cuentas" },
]);
