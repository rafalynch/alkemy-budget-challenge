import { state } from "../../state";
import { Router } from "@vaadin/router";
import "./index.css";
import { categories } from "../..";

class MisCuentas extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Get state. If not logged in go to log in page
    const currentState = state.getState();
    if (!currentState.loggedIn) {
      Router.go("/login");
      return;
    }
    this.render();
  }
  async render() {
    // ---- HEADER ----
    const headerEl = document.createElement("custom-header");
    this.appendChild(headerEl);

    // ---- CONTAINER ----
    const misCuentasContainerEl = document.createElement("div");
    misCuentasContainerEl.classList.add("signup-container");
    this.appendChild(misCuentasContainerEl);

    // ---- TITLE ----
    const newRecordTitle = document.createElement("h2");
    newRecordTitle.innerText = "Crear nuevo registro";
    misCuentasContainerEl.appendChild(newRecordTitle);
    newRecordTitle.classList.add("new-record-title");

    // ---- NEW RECORD FORM ----
    const newRecordForm = document.createElement("custom-new-record-form");
    misCuentasContainerEl.appendChild(newRecordForm);

    // ---- RECORDS TABLE TITLE ----
    const myRecordsTitleEl = document.createElement("h2");
    myRecordsTitleEl.innerText = "Mis registros";
    misCuentasContainerEl.appendChild(myRecordsTitleEl);
    myRecordsTitleEl.classList.add("my-records-title");

    // ---- FILTER BY CATEGORY ----
    const categoryFilterEl = document.createElement("div");
    misCuentasContainerEl.appendChild(categoryFilterEl);
    categoryFilterEl.classList.add("filter-by-category-form");
    // Category label
    const categoryLabelEl = document.createElement("label");
    categoryLabelEl.classList.add("category-filter-label");
    categoryLabelEl.setAttribute("for", "category-filter");
    categoryLabelEl.innerText = "Filtrar por categoría: ";
    categoryFilterEl.appendChild(categoryLabelEl);
    // Category select
    const categoryFilterInputEl = document.createElement("select");
    categoryFilterInputEl.name = "category-filter";
    categoryFilterInputEl.id = "category-filter";
    categoryFilterEl.appendChild(categoryFilterInputEl);
    categoryFilterInputEl.classList.add("input-category-filter");
    const allOpt = document.createElement("option");
    allOpt.innerText = "Todas";
    allOpt.value = "all";
    categoryFilterInputEl.appendChild(allOpt);
    // Set category options
    categories.forEach((category) => {
      const categoryOpt = document.createElement("option");
      categoryOpt.innerText = category;
      categoryOpt.value = category;
      categoryFilterInputEl.appendChild(categoryOpt);
    });

    // ---- EDITABLE RECORDS TABLE ----
    // Container
    const recordsTableContainerEl = document.createElement("div");
    recordsTableContainerEl.classList.add("table-container");
    misCuentasContainerEl.appendChild(recordsTableContainerEl);
    // Records table
    const recordsTable = document.createElement("custom-records-table");
    recordsTable.setAttribute("editable", "true");
    recordsTableContainerEl.appendChild(recordsTable);

    // ---- FILTER HANDLER ----
    categoryFilterInputEl.addEventListener("change", async (e) => {
      const table = document.querySelector(".table-container");
      table.innerHTML = "";
      const value = (e.target as any).value;
      if (value == "all") {
        const recordsTable = document.createElement("custom-records-table");
        recordsTable.setAttribute("editable", "true");
        table.appendChild(recordsTable);
      } else {
        const recordsTable = document.createElement("custom-records-table");
        recordsTable.setAttribute("editable", "true");
        recordsTable.setAttribute("category", value);
        table.appendChild(recordsTable);
      }
    });
  }
}

customElements.define("custom-mis-cuentas", MisCuentas);
