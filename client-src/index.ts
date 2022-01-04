import { Router } from "@vaadin/router";
import { state } from "./state";

// Init router
import "./router";

// Import pages
import "./pages/home";
import "./pages/login";
import "./pages/signup";
import "./pages/mis-cuentas";

// Import all components
import "./components/header";
import "./components/new-record-form";
import "./components/records-table";
import "./components/edit-record-modal";
import "./components/edit-record-form";

// Set record categories
const rawCategories = [
  "General",
  "Deportes",
  "Alimentos",
  "Juegos",
  "Bebidas",
  "Restaurantes",
  "Alquiler",
  "Mantenimiento",
  "Gastos medicos",
  "Impuestos",
  "Regalos",
  "Transporte",
  "Auto",
  "Limpieza",
  "Trabajo",
  "Ocio",
  "Entretenimiento",
  "Supermercado",
  "Ropa",
  "Otros",
];
// Sort categories and export
export const categories = rawCategories.sort();

// Init state
state.init();

// If user is not logged in, go to home page
(() => {
  const currentState = state.getState();
  if (!currentState.loggedIn) {
    Router.go("/");
  }
})();
