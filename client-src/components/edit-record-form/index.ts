import { state } from "../../state";
import "./index.css";
import { categories } from "../../index";

class EditRecordForm extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  async render() {
    // ---- FETCH DATA ----
    const recordId = this.getAttribute("record-id");
    const recordData = await state.getRecordById(recordId);

    // ---- EDIT RECORD FORM ----
    const editRecordFormEl = document.createElement("form");
    this.appendChild(editRecordFormEl);
    editRecordFormEl.classList.add("edit-record-form");

    // Date label
    const dateLabelEl = document.createElement("label");
    dateLabelEl.classList.add("edit-label");
    dateLabelEl.setAttribute("for", "edit-date");
    dateLabelEl.innerText = "Fecha";
    editRecordFormEl.appendChild(dateLabelEl);
    // Date input
    const dateInputEl = document.createElement("input");
    dateInputEl.classList.add("edit-date-input");
    dateInputEl.type = "date";
    dateInputEl.name = "date";
    dateInputEl.id = "edit-date";
    dateInputEl.defaultValue = recordData.date;
    editRecordFormEl.appendChild(dateInputEl);

    // Concept label
    const conceptLabelEl = document.createElement("label");
    conceptLabelEl.classList.add("edit-label");
    conceptLabelEl.setAttribute("for", "edit-concept");
    conceptLabelEl.innerText = "Concepto";
    editRecordFormEl.appendChild(conceptLabelEl);
    // Concept input
    const conceptInputEl = document.createElement("input");
    conceptInputEl.classList.add("edit-concept-input");
    conceptInputEl.type = "text";
    conceptInputEl.name = "concept";
    conceptInputEl.id = "edit-concept";
    conceptInputEl.defaultValue = recordData.concept;
    editRecordFormEl.appendChild(conceptInputEl);

    // Type label
    const typeLabelEl = document.createElement("label");
    typeLabelEl.classList.add("edit-label");
    typeLabelEl.setAttribute("for", "edit-type");
    typeLabelEl.innerText = "Tipo";
    editRecordFormEl.appendChild(typeLabelEl);
    // Type input
    const typeInputEl = document.createElement("input");
    typeInputEl.classList.add("edit-type-input");
    typeInputEl.name = "type";
    typeInputEl.id = "edit-type";
    typeInputEl.defaultValue =
      recordData.type == "expense" ? "Gasto" : "Ingreso";
    typeInputEl.disabled = true;
    editRecordFormEl.appendChild(typeInputEl);

    // Amount label
    const amountLabelEl = document.createElement("label");
    amountLabelEl.classList.add("edit-label");
    amountLabelEl.setAttribute("for", "edit-amount");
    amountLabelEl.innerText = "Monto";
    editRecordFormEl.appendChild(amountLabelEl);
    // Amount input
    const amountInputEl = document.createElement("input");
    amountInputEl.classList.add("edit-amount-input");
    amountInputEl.type = "number";
    amountInputEl.step = "0.01";
    amountInputEl.name = "amount";
    amountInputEl.id = "edit-amount";
    amountInputEl.defaultValue = recordData.amount;
    editRecordFormEl.appendChild(amountInputEl);

    // Category label
    const categoryLabelEl = document.createElement("label");
    categoryLabelEl.classList.add("edit-label");
    categoryLabelEl.setAttribute("for", "edit-category");
    categoryLabelEl.innerText = "Categoría";
    editRecordFormEl.appendChild(categoryLabelEl);
    // Category input
    const categoryInputEl = document.createElement("select");
    categoryInputEl.classList.add("edit-category-input");
    categoryInputEl.name = "category";
    categoryInputEl.id = "edit-category";
    editRecordFormEl.appendChild(categoryInputEl);
    // Category options
    categories.forEach((category) => {
      const categoryOptEl = document.createElement("option");
      categoryOptEl.innerText = category;
      categoryOptEl.value = category;
      if (category == recordData.category) {
        categoryOptEl.selected = true;
      }
      categoryInputEl.appendChild(categoryOptEl);
    });

    // Confirm button
    const editBtnEl = document.createElement("button");
    editRecordFormEl.appendChild(editBtnEl);
    editBtnEl.classList.add("submit-edit-btn");
    editBtnEl.innerText = "CONFIRMAR";

    // ---- FORM HANDLER ----
    editRecordFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      // Get values
      const date = target.date.value;
      const concept = target.concept.value;
      const amount = target.amount.value;
      const category = target.category.value;
      // Check for empty fields
      if (!date || !concept || !amount || !category) {
        window.alert("Los campos no pueden quedar vacios");
        return;
      }

      const edited = await state.editRecord(recordId, {
        date,
        concept,
        amount,
        category,
      });
      if (edited) {
        location.reload();
        window.alert("Registro editado correctamente.");
      }
    });
  }
}

customElements.define("custom-edit-record-form", EditRecordForm);
