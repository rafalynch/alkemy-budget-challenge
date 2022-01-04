import { state } from "../../state";
import "./index.css";
import { categories } from "../../index";

class NewRecordForm extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    // ---- FORM ----
    const newRecordForm = document.createElement("form");
    this.appendChild(newRecordForm);
    newRecordForm.classList.add("new-record-form");

    // Date label
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerText = "Fecha";
    newRecordForm.appendChild(dateLabel);
    // Date input
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "date";
    dateInput.id = "date";
    newRecordForm.appendChild(dateInput);
    dateInput.classList.add("input-date");

    // Concept label
    const conceptLabel = document.createElement("label");
    conceptLabel.setAttribute("for", "concept");
    conceptLabel.innerText = "Concepto";
    newRecordForm.appendChild(conceptLabel);
    // Concept input
    const conceptInput = document.createElement("input");
    conceptInput.type = "text";
    conceptInput.name = "concept";
    conceptInput.id = "concept";
    newRecordForm.appendChild(conceptInput);
    conceptInput.classList.add("input-concept");

    // Type label
    const typeLabel = document.createElement("label");
    typeLabel.setAttribute("for", "type");
    typeLabel.innerText = "Tipo";
    newRecordForm.appendChild(typeLabel);
    // Type input
    const typeInput = document.createElement("select");
    typeInput.name = "type";
    typeInput.id = "type";
    newRecordForm.appendChild(typeInput);
    typeInput.classList.add("input-type");
    // Type options
    const incomeOpt = document.createElement("option");
    incomeOpt.innerText = "Ingreso";
    incomeOpt.value = "income";
    const expenseOpt = document.createElement("option");
    expenseOpt.innerText = "Gasto";
    expenseOpt.value = "expense";
    typeInput.append(incomeOpt, expenseOpt);

    // Amount label
    const amountLabel = document.createElement("label");
    amountLabel.setAttribute("for", "amount");
    amountLabel.innerText = "Monto";
    newRecordForm.appendChild(amountLabel);
    // Amount input
    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.step = "0.01";
    amountInput.name = "amount";
    amountInput.id = "amount";
    newRecordForm.appendChild(amountInput);
    amountInput.classList.add("input-amount");

    // Category label
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "category");
    categoryLabel.innerText = "Categoría";
    newRecordForm.appendChild(categoryLabel);
    // Category input
    const categoryInput = document.createElement("select");
    categoryInput.name = "category";
    categoryInput.id = "category";
    newRecordForm.appendChild(categoryInput);
    categoryInput.classList.add("input-category");
    // Category options
    categories.forEach((category) => {
      const categoryOpt = document.createElement("option");
      categoryOpt.innerText = category;
      categoryOpt.value = category;
      categoryInput.appendChild(categoryOpt);
    });

    // Submit button
    const submitBtn = document.createElement("button");
    newRecordForm.appendChild(submitBtn);
    submitBtn.classList.add("submit-btn");
    submitBtn.innerText = "CREAR";

    // ---- FORM HANDLER ----
    newRecordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      // Get values
      const date = target.date.value;
      const concept = target.concept.value;
      const amount = target.amount.value;
      const type = target.type.value;
      const category = target.category.value;
      // Check for empty fields
      if (!date || !concept || !amount || !type || !category) {
        window.alert("Los campos no pueden quedar vacios");
        return;
      }

      const created = await state.newRecord({
        date,
        concept,
        amount,
        type,
        category,
      });
      if (created) {
        location.reload();
        window.alert("Nuevo registro creado.");
      }
    });
  }
}

customElements.define("custom-new-record-form", NewRecordForm);
