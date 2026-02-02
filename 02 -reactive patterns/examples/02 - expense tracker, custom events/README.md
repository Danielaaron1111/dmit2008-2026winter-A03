
# Expense Tracker – Custom Events
---
## What is a Custom Event?
A Custom Event is a user-defined event that you can dispatch and listen to in your application — just like built-in events (click, input, submit), but with your own event name and data.

It allows different parts of your app (especially Web Components) to communicate decoupled, without relying on direct function calls or shared state.

### Syntax
```js
const event = new CustomEvent("my-event-name", {
  detail: { key: "value" },
  bubbles: true,
  composed: true
});

element.dispatchEvent(event);
```
- detail: A custom data object passed with the event (can be any serializable value)
- bubbles:	Allows the event to bubble up through the DOM hierarchy
- composed:	Allows event to pass out of Shadow DOM into the light DOM

---

## PART 1 – Changes to `<expense-card>` Component

### Purpose:
Add **Edit** and **Delete** buttons to each card and emit **custom events** (`expense-edit` and `expense-delete`) when clicked.

### Step-by-Step Explanation:

#### 1. **Using Shadow DOM**
```js
this.attachShadow({ mode: "open" });
```
Encapsulates HTML and CSS inside the component to avoid global styles affecting it.

---

#### 2. **Card Layout with Buttons and Styling**
Includes:
- Title, Category, Date, Amount fields
- `.edit-btn` and `.delete-btn` with styles

---

#### 3. **Custom Event Dispatching**

```js
this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => {
  this.dispatchEvent(new CustomEvent("expense-delete", {
    bubbles: true,
    composed: true,
    detail: { id: this.id }
  }));
});
```

```js
this.shadowRoot.querySelector(".edit-btn").addEventListener("click", () => {
  this.dispatchEvent(new CustomEvent("expense-edit", {
    bubbles: true,
    composed: true,
    detail: {
      id: this.id,
      title: this.getAttribute("title"),
      category: this.getAttribute("category"),
      date: this.getAttribute("date"),
      amount: this.getAttribute("amount")
    }
  }));
});
```

#### 🔑 Why `bubbles: true` and `composed: true`?

| Option         | Purpose                                   |
|----------------|--------------------------------------------|
| `bubbles: true` | Allows the event to bubble up to ancestors |
| `composed: true` | Lets it escape the Shadow DOM            |

---

## PART 2 – Changes to `main.js`

### Purpose:
Handle custom events, update the form for editing, and dynamically show total expenses.

---

### 1. Subscribing to Expense Updates

```js
expenses.subscribe("update", (theExpenses) => {
  expenseContainer.setAttribute("expenses", JSON.stringify(theExpenses));
  document.getElementById("total-expenses").innerText = expenses.totalExpenses();
});
```

- Updates the rendered card list
- Recalculates and shows the new total

---

### 2. Form Logic – Add vs. Edit Mode

```js
if (document.getElementById("submiter").innerText === "Add Expense") {
  expenses.addExpense({ title, category, date, amount });
} else {
  document.getElementById("submiter").innerText = "Add Expense";
  const id = Number(document.getElementById("expense-id").value);
  expenses.editExpense(id, { title, category, date, amount });
}
```

- Uses button text to detect mode
- Uses hidden input `expense-id` to track which item is being edited

---

### 3. Handling `expense-delete`

```js
expenseContainer.addEventListener("expense-delete", (e) => {
  const id = Number(e.detail.id);
  expenses.removeExpense(id);
});
```

Removes an expense from the list based on ID.

---

### 4. Handling `expense-edit`

```js
expenseContainer.addEventListener("expense-edit", (e) => {
  const { id, title, category, date, amount } = e.detail;
  document.getElementById("title").value = title;
  document.getElementById("category").value = category;
  document.getElementById("date").value = date;
  document.getElementById("amount").value = amount;
  document.getElementById("submiter").innerText = "Edit";
  document.getElementById("expense-id").value = id;
});
```

Fills the form fields with the selected card’s data and sets form to edit mode.

---
## Adding Total amount
```js
expenses.subscribe("update", (theExpenses) => {
  expenseContainer.setAttribute("expenses", JSON.stringify(theExpenses));
  document.getElementById("total-expenses").innerText = expenses.totalExpenses();
});
```
## Summary of Features

| Feature           | How It Works                                           |
|-------------------|--------------------------------------------------------|
| Delete expense     | `expense-delete` → removeExpense by ID                 |
| Edit expense       | `expense-edit` → fill form + change mode              |
| Dynamic total      | Calculated after every update                         |
| Mode switching     | Based on button text + hidden ID field                |

---

## Final Thoughts

You implemented:
- Shadow DOM and encapsulation
- Custom events to decouple UI and logic
- Real-time updates using the Pub/Sub model

**suggestions:**
- Add a confirmation prompt for deletes

