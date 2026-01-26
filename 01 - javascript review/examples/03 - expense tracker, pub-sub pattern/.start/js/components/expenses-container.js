class ExpenseContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.container.classList.add('expense-container');
    this.shadowRoot.appendChild(this.container);
    const style = document.createElement("style");
    style.textContent = `
    .expense-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  box-sizing: border-box;
    }`;

    this.shadowRoot.appendChild(style);
  }

  static get observedAttributes() {
    return ['expenses'];
  }

  connectedCallback() {
    this.renderExpenses();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'expenses' && oldValue !== newValue) {
      this.renderExpenses();
    }
  }

  renderExpenses(){
    this.container.innerHTML='';
    const expensesAttr = this.getAttribute("expenses");
    let expenses = [];

    try {
      expenses = JSON.parse(expensesAttr);
    } catch (e) {
      console.warn("Invalid expenses attribute:", e);
    }

    if (Array.isArray(expenses)) {
      expenses.forEach((exp) => {
        const card = document.createElement("expense-card");
        card.setAttribute("title", exp.title);
        card.setAttribute("category", exp.category);
        card.setAttribute("date", exp.date);
        card.setAttribute("amount", exp.amount);
        card.setAttribute("id", exp.id);
        this.container.appendChild(card);
      });
    }
  }
}

customElements.define("expense-container", ExpenseContainer);
