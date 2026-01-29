class ExpenseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
    .card {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex:1 1 300px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 1.1rem;
}
.amount {
  color: green;
  font-weight: bold;
}
.meta {
  font-size: 0.9rem;
  color: #666;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 10px;
}
.actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.edit-btn {
  background-color: #3b82f6;
  color: white;
}
.delete-btn {
  background-color: #ef4444;
  color: white;
}`;


    this.shadowRoot.innerHTML = `
      <div class="card" id="">
        <div class="header">
          <div>
            <div class="title"></div>
            <div class="meta category"></div>
          </div>
          <div class="amount"></div>
        </div>
        <div class="meta date"></div>
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
        this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".title").textContent =
      this.getAttribute("title") || "No title";
    this.shadowRoot.querySelector(".category").textContent =
      "Category: " + (this.getAttribute("category") || "");
    this.shadowRoot.querySelector(".date").textContent =
      this.getAttribute("date") || "";
    this.shadowRoot.querySelector(".amount").textContent =
      "$" + parseFloat(this.getAttribute("amount") || 0).toFixed(2);
    this.shadowRoot.querySelector(".card").setAttribute("id", Number(this.getAttribute("id")) || new Date().getTime());
  }
}

customElements.define("expense-card", ExpenseCard);
