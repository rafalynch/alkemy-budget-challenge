import { state } from "../../state";
import { Router } from "@vaadin/router";
import "./index.css";

class Login extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Get state. If logged in go to home page
    const currentState = state.getState();
    if (currentState.loggedIn) {
      Router.go("/login");
      return;
    }
    this.render();
  }
  render() {
    // ---- HEADER ----
    const headerEl = document.createElement("custom-header");
    this.appendChild(headerEl);

    // ---- LOGIN CONTAINER ----
    const loginContainerEl = document.createElement("div");
    loginContainerEl.classList.add("login-container");
    this.appendChild(loginContainerEl);

    // ---- TITLE ----
    const titleEl = document.createElement("h1");
    loginContainerEl.appendChild(titleEl);
    titleEl.className = "login__title";
    titleEl.innerHTML = "Iniciar sesión";

    // ---- LOGIN FORM ----
    const loginFormEl = document.createElement("form");
    loginContainerEl.appendChild(loginFormEl);
    loginFormEl.classList.add("login-form");

    // Email label
    const emailLabelEl = document.createElement("label");
    loginFormEl.appendChild(emailLabelEl);
    emailLabelEl.setAttribute("for", "email");
    emailLabelEl.innerHTML = "EMAIL";
    // Email input
    const emailInputEl = document.createElement("input");
    loginFormEl.appendChild(emailInputEl);
    emailInputEl.type = "email";
    emailInputEl.name = "email";
    emailInputEl.id = "email";
    emailInputEl.classList.add("login-form__email-input");

    // Password label
    const passwordLabelEl = document.createElement("label");
    loginFormEl.appendChild(passwordLabelEl);
    passwordLabelEl.setAttribute("for", "password");
    passwordLabelEl.innerHTML = "CONTRASEÑA";
    // Password input
    const passwordInputEl = document.createElement("input");
    passwordInputEl.type = "password";
    passwordInputEl.name = "password";
    passwordInputEl.id = "password";
    passwordInputEl.classList.add("login-form__password-input");
    loginFormEl.appendChild(passwordInputEl);

    // Log in Button
    const btnEl = document.createElement("button");
    loginFormEl.appendChild(btnEl);
    btnEl.innerHTML = "INGRESAR";
    btnEl.classList.add("login-form__btn");

    // Form handler
    loginFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target: any = e.target;

      const logged = await state.logIn(
        target.email.value,
        target.password.value
      );
      if (logged) {
        Router.go("/home");
      } else {
        window.alert(
          "La contraseña o el usuario son incorrectos. Si aún no tienes una cuenta, haz click en REGISTRARSE."
        );
      }
    });

    // ---- SIGN UP BUTTON ----
    const signupBtnEl = document.createElement("button");
    loginContainerEl.appendChild(signupBtnEl);
    signupBtnEl.innerHTML = "REGISTRARSE";
    signupBtnEl.classList.add("signup-btn");
    signupBtnEl.addEventListener("click", () => {
      Router.go("/signup");
    });
  }
}

customElements.define("custom-login", Login);
