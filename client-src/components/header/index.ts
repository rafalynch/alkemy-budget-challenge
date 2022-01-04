import { Router } from "@vaadin/router";
import { state } from "../../state";
import "./index.css";

class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    // Current State
    const currentState = state.getState();

    // ---- CONTAINER ----
    const headerContainerEl = document.createElement("header");
    this.appendChild(headerContainerEl);
    headerContainerEl.classList.add("header-container");

    // ---- LOGO ----
    const logoEl = document.createElement("img");
    headerContainerEl.appendChild(logoEl);
    logoEl.setAttribute("src", require("url:../../static/logo_header.png"));
    logoEl.setAttribute("alt", "logo");
    logoEl.classList.add("header__logo-img");
    logoEl.addEventListener("click", () => {
      Router.go("/");
    });

    // ---- MENU ----
    const menuEl = document.createElement("ul");
    headerContainerEl.appendChild(menuEl);
    menuEl.classList.add("header__menu");

    // ---- BURGER ----
    const burgerEl = document.createElement("img");
    headerContainerEl.appendChild(burgerEl);
    burgerEl.setAttribute("src", require("url:../../static/menu.png"));
    burgerEl.setAttribute("alt", "menu");
    burgerEl.classList.add("header__burger-img");

    burgerEl.addEventListener("click", () => {
      // toggle nav-bar
      menuEl.classList.toggle("nav-active");
    });

    // ---- NAV LINKS ----
    // Home
    const navLinkHomeEl = document.createElement("li");
    menuEl.appendChild(navLinkHomeEl);
    navLinkHomeEl.classList.add("nav-link");
    navLinkHomeEl.innerHTML = "Home";
    navLinkHomeEl.addEventListener("click", () => {
      menuEl.classList.toggle("nav-active");
      Router.go("/home");
    });

    // Mis cuentas
    const navLinkMisCuentasEl = document.createElement("li");
    menuEl.appendChild(navLinkMisCuentasEl);
    navLinkMisCuentasEl.classList.add("nav-link");
    navLinkMisCuentasEl.innerHTML = "Mis cuentas";
    navLinkMisCuentasEl.addEventListener("click", () => {
      menuEl.classList.toggle("nav-active");
      Router.go("/mis-cuentas");
    });

    // Log in / Log out.
    const navSessionEl = document.createElement("li");
    menuEl.appendChild(navSessionEl);
    navSessionEl.classList.add("nav-session");

    if (currentState.loggedIn) {
      // If exists a current session, show mail and log out button
      navSessionEl.innerHTML = `
        <div class="nav-session__email">${currentState.currentUser.email}</div>
      `;
      const logOutBtnEl = document.createElement("div");
      logOutBtnEl.className = "nav-session__close";
      logOutBtnEl.innerHTML = `CERRAR SESION`;
      navSessionEl.appendChild(logOutBtnEl);
      logOutBtnEl.addEventListener("click", () => {
        state.logOut();
        Router.go("/");
        location.reload();
        menuEl.classList.toggle("nav-active");
      });
    } else {
      // If there is no current session, show log in button
      navSessionEl.innerHTML = `
      <div class="nav-session__in">INICIAR SESION</div>
      `;
      navSessionEl.addEventListener("click", () => {
        Router.go("/login");
        menuEl.classList.toggle("nav-active");
      });
    }
  }
}

customElements.define("custom-header", Header);
