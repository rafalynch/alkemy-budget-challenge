import "./index.css";

class editRecordModal extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    // ---- MASK ----
    const maskEl = document.createElement("div");
    document.body.appendChild(maskEl);
    maskEl.classList.add("mask");

    // ---- MODAL ----
    const modalEl = document.createElement("div");
    document.body.appendChild(modalEl);
    modalEl.classList.add("edit-modal");

    // Exit button
    const modalExitEl = document.createElement("img");
    modalExitEl.setAttribute("src", require("url:../../static/exit.svg"));
    modalExitEl.classList.add("modal-exit");
    modalEl.appendChild(modalExitEl);

    // Title
    const modalTitleEl = document.createElement("h3");
    modalTitleEl.classList.add("modal-title");
    modalEl.appendChild(modalTitleEl);
    modalTitleEl.innerHTML = `Editar registro`;

    // Form
    const recordId = this.getAttribute("record-id");

    const modalFormEl = document.createElement("custom-edit-record-form");
    modalFormEl.setAttribute("record-id", recordId);
    modalFormEl.classList.add("modal-form");
    modalEl.appendChild(modalFormEl);

    // Exit logic
    modalExitEl.addEventListener("click", volver);
    maskEl.addEventListener("click", volver);

    function volver() {
      modalEl.remove();
      maskEl.remove();
      document.body.style.overflow = "initial";
    }
  }
}

customElements.define("custom-edit-record-modal", editRecordModal);
