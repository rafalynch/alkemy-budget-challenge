import { state } from "../../state";
import "./index.css";

class RecordsTable extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  async render() {
    // Get attributes
    const limit = Number.parseInt(this.getAttribute("limit"));
    const category = this.getAttribute("category");
    // Get records
    const myRecords = await state.getRecords(limit, category);
    // Check for no records
    if (myRecords.length == 0) {
      const subtitle = document.createElement("h3");
      this.appendChild(subtitle);
      subtitle.innerText = "Aún no cargaste ningún registro";
      return;
    }

    // ---- TABLE ----
    const tableHeaders = ["Fecha", "Concepto", "Monto", "Categoría"]; // Headers

    const tableContainerEl = document.createElement("div");
    this.appendChild(tableContainerEl);

    const tableEl = document.createElement("table");
    tableEl.classList.add("table");

    const tableHeadEl = document.createElement("thead");
    tableHeadEl.classList.add("table-head");

    const tableHeaderRowEl = document.createElement("tr");
    tableHeaderRowEl.classList.add("table-header-row");

    // Set header values
    tableHeaders.forEach((header) => {
      const tableHeader = document.createElement("th");
      tableHeader.innerText = header;
      tableHeaderRowEl.append(tableHeader);
    });

    tableHeadEl.append(tableHeaderRowEl);
    tableEl.append(tableHeadEl);

    // Table body
    const tableBodyEl = document.createElement("tbody");
    tableBodyEl.classList.add("table-body");
    tableEl.appendChild(tableBodyEl);

    tableContainerEl.appendChild(tableEl);

    // Append records to table
    myRecords.forEach((record) => {
      const tableRowEl = document.createElement("tr");
      tableRowEl.classList.add("table-row");

      // Set type
      if (record.type == "income") {
        tableRowEl.classList.add("income");
      } else {
        tableRowEl.classList.add("expense");
      }

      // Set date
      const date = document.createElement("td");
      const dateSplit = (record.date as string).split("-");
      const dateJoin = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
      date.innerText = dateJoin;

      // Set concept
      const concept = document.createElement("td");
      concept.innerText = record.concept;

      // Set amount
      const amount = document.createElement("td");
      if (record.type == "expense") {
        amount.innerText = "-$" + record.amount;
      } else {
        amount.innerText = "$" + record.amount;
      }

      // Set category
      const category = document.createElement("td");
      category.innerText = record.category;

      // Append
      tableRowEl.append(date, concept, amount, category);

      // If talbe is editable, add edit and delete buttons
      if (this.getAttribute("editable")) {
        // Edit button
        const edit = document.createElement("td");
        edit.classList.add("icon-td", "edit");
        const editBtn = document.createElement("img");
        editBtn.alt = "edit-record";
        editBtn.setAttribute("src", require("url:../../static/edit.png"));
        editBtn.classList.add("edit-btn");
        edit.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
          const editRecordModalEl = document.createElement(
            "custom-edit-record-modal"
          );
          editRecordModalEl.setAttribute("record-id", record.id);
          this.appendChild(editRecordModalEl);
        });
        // Delete button
        const deleteEl = document.createElement("td");
        deleteEl.classList.add("icon-td", "delete");
        const deleteBtn = document.createElement("img");
        deleteBtn.alt = "delete-record";
        deleteBtn.setAttribute("src", require("url:../../static/delete.png"));
        deleteBtn.classList.add("delete-btn");
        deleteEl.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", async () => {
          const confirmation = window.confirm(
            "Seguro que deseas eliminar este registro?"
          );
          if (confirmation) {
            await state.deleteRecord(record.id);
            location.reload();
          }
        });
        tableRowEl.append(edit, deleteEl);
      }

      tableBodyEl.appendChild(tableRowEl);
    });
  }
}

customElements.define("custom-records-table", RecordsTable);
