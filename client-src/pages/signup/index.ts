import { state } from "../../state";
import { Router } from "@vaadin/router";
import "./index.css";

class Signup extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Get state. If logged in go to home page
    const currentState = state.getState();
    if (currentState.loggedIn) {
      Router.go("/");
      return;
    }
    this.render();
  }
  render() {
    // ---- HEADER ----
    const headerEl = document.createElement("custom-header");
    this.appendChild(headerEl);

    // ---- SIGNUP CONTAINER ----
    const signupContainerEl = document.createElement("div");
    signupContainerEl.classList.add("signup-container");
    this.appendChild(signupContainerEl);

    // ---- TITLE ----
    const titleEl = document.createElement("h1");
    signupContainerEl.appendChild(titleEl);
    titleEl.className = "signup__title";
    titleEl.innerHTML = "Registrarse";

    // ---- SIGN UP FORM ----
    const signupFormEl = document.createElement("form");
    signupContainerEl.appendChild(signupFormEl);
    signupFormEl.classList.add("signup-form");

    // Email label
    const emailLabelEl = document.createElement("label");
    signupFormEl.appendChild(emailLabelEl);
    emailLabelEl.setAttribute("for", "email");
    emailLabelEl.innerHTML = "EMAIL";
    // Email input
    const emailInputEl = document.createElement("input");
    signupFormEl.appendChild(emailInputEl);
    emailInputEl.type = "email";
    emailInputEl.name = "email";
    emailInputEl.id = "email";
    emailInputEl.classList.add("signup-form__email-input");

    // Password label
    const passwordLabelEl = document.createElement("label");
    signupFormEl.appendChild(passwordLabelEl);
    passwordLabelEl.setAttribute("for", "password");
    passwordLabelEl.innerHTML = "CONTRASEÑA";
    // Password input
    const passwordInputEl = document.createElement("input");
    passwordInputEl.type = "password";
    passwordInputEl.name = "password";
    passwordInputEl.id = "password";
    passwordInputEl.classList.add("signup-form__password-input");
    signupFormEl.appendChild(passwordInputEl);

    // Confirm password label
    const confirmPasswordLabelEl = document.createElement("label");
    signupFormEl.appendChild(confirmPasswordLabelEl);
    confirmPasswordLabelEl.setAttribute("for", "confirm-password");
    confirmPasswordLabelEl.innerHTML = "CONFIRMAR CONTRASEÑA";
    // Confirm password input
    const consfirmPasswordInputEl = document.createElement("input");
    consfirmPasswordInputEl.type = "password";
    consfirmPasswordInputEl.name = "confirm-password";
    consfirmPasswordInputEl.id = "confirm-password";
    consfirmPasswordInputEl.classList.add("signup-form__password-input");
    signupFormEl.appendChild(consfirmPasswordInputEl);

    // Sign up button
    const btnEl = document.createElement("button");
    signupFormEl.appendChild(btnEl);
    btnEl.innerHTML = "ENVIAR";
    btnEl.classList.add("signup-form__btn");

    // ---- FORM HANDLER ----
    signupFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target: any = e.target;
      // Get values
      const email = target.email.value;
      const password = target.password.value;
      const passwordConfirmation = target["confirm-password"].value;
      // Check for empty fields
      if (email == "" || password == "") {
        window.alert("Los campos no pueden quedar vacios");
        return;
      }
      // Check for password length
      if ((target.password.value as string).length < 8) {
        window.alert("La contraseña debe tener al menos 8 caracteres de largo");
        return;
      }
      // Check for password match
      if (password != passwordConfirmation) {
        window.alert("Las contraseñas no coinciden");
        return;
      }
      // Sign up
      const signedUp = await state.signUp(email, password);
      if (signedUp) {
        await state.logIn(email, password);
        Router.go("/home");
      } else {
        window.alert("Ya existe una cuenta con ese email");
      }
    });
  }
}

customElements.define("custom-signup", Signup);
