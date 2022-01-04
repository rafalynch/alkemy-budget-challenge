import { state } from "../../state";
import "./index.css";

class Home extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    // ---- HEADER ----
    const headerEl = document.createElement("custom-header");
    this.appendChild(headerEl);

    // Get state
    const currentState = state.getState();

    // ---- HOME CONTAINER ----
    const homeContainerEl = document.createElement("div");
    homeContainerEl.classList.add("home-container");
    this.appendChild(homeContainerEl);

    // ---- TITLE ----
    const titleEl = document.createElement("h1");
    homeContainerEl.appendChild(titleEl);
    titleEl.className = "home__title";
    titleEl.innerHTML = "Balance";

    // ---- SUBTITLE ----
    const subtitleEl = document.createElement("h3");
    homeContainerEl.appendChild(subtitleEl);
    subtitleEl.className = "home__subtitle";
    if (!currentState.loggedIn) {
      subtitleEl.innerHTML = "Inicia sesión para entrar a tu cuenta";
    } else {
      state.getBalance().then((res) => {
        const balance = (res.balance as number).toString();
        if (balance.charAt(0) == "-") {
          const balanceSliced = balance.slice(1);
          subtitleEl.innerHTML = "TU BALANCE ES DE -$" + balanceSliced;
        } else {
          subtitleEl.innerHTML = "TU BALANCE ES DE $" + balance;
        }
      });

      // ---- RECORDS TABLE ----
      const recordsTable = document.createElement("custom-records-table");
      recordsTable.classList.add("home__records-table");
      recordsTable.setAttribute("limit", "10");
      homeContainerEl.appendChild(recordsTable);
    }
  }
}

customElements.define("custom-home", Home);
