# Expense Tracker Using UI Components and Publish/Subscribe Pattern

---

## What is the Publish/Subscribe Pattern?

The **Publish/Subscribe (Pub/Sub)** pattern is a messaging design pattern that decouples components.

- **Publisher**: Emits events
- **Subscriber**: Listens for specific events
- **Event Broker (Optional)**: Manages the communication
Imagine you have a news agency that just tell you those news you have anounced your interest previously.

Additional explanation of the pub/sub pattern: [link](https://medium.com/@MakeComputerScienceGreatAgain/understanding-the-pub-sub-design-pattern-a-fundamental-building-block-for-scalable-and-decoupled-63f2efe22b4e)

### Why Use It?

- **Loose Coupling**: Components don’t need to know about each other.
- **Scalability**: New features can be added without modifying core logic.
- **Maintainability**: Code becomes easier to read, test, and update.

---

## Project Structure

```
project-root/
│
├── index.html
├── css/
│   └── main.css
└── js/
    ├── components/
    │   ├── expense-card.js
    │   └── expense-container.js
    ├── expenses.js
    ├── expense-data.js
    └── main.js
```

---

## `js/expenses.js` – Central Logic File

## Step 1: Define the Pub/Sub System

```js
const PubSub = {
  _subscribers: {},

  subscribe(event, callback) {
    if (!this._subscribers[event]) {
      this._subscribers[event] = [];
    }
    this._subscribers[event].push(callback);
  },

  publish(event, ...data) {
    if (this._subscribers[event]) {
      this._subscribers[event].forEach(callback => callback(...data));
    }
  }
};
```

### ✅ What It Does:
- `PubSub` is an object acting as an **event manager**.
- It keeps track of event names (e.g., `"update"`) and their **callback listeners**.
- `subscribe(event, callback)`:
  - Registers a function to run when an event is triggered.
- `publish(event, ...data)`:
  - Calls all the subscribed callbacks for a given event and passes them the `data`.

> This pattern allows us to **broadcast updates** (like expense list changes) to UI components without hard coding any dependency between them.

---

## Step 2: Define the `expenses` Object

```js
const expenses = {
  list: [],
```

This starts with an empty array `list`, which will store all expense entries.

---

### `addExpense(...exp)`

```js
  addExpense(...exp) {
    this.list.push(...exp);
    this.publish("update", this.list);
  },
```

- Adds one or more expenses to the list.
- `...exp` uses the **spread operator** so multiple items can be added at once.
- After adding, it **publishes** the `"update"` event with the current list.

---

### `filterExpense(input)`

```js
  filterExpense(input) {
    const result = this.list.filter(exp => {
        if (
            exp.title.toLowerCase().includes(input.toLowerCase()) ||
            exp.category.toLowerCase().includes(input.toLowerCase()) ||
            exp.date.toLowerCase().includes(input.toLowerCase()) ||
            exp.amount.toString().toLowerCase().includes(input.toLowerCase())
        ) {
            return true;
        }
    });
    this.publish("update", result);
  },
```

- Filters the list based on a **case-insensitive match** of the `input` string.
- Searches in `title`, `category`, `date`, and `amount` fields.
- Publishes an `"update"` event with the **filtered results**, not the full list.

---

### `clear()`

```js
  clear() {
    this.list = [];
    this.publish("update", this.list);
  }
```

- Clears the entire list.
- Triggers the `"update"` event to let UI know the list is now empty.

---

## Step 3: Integrate Pub/Sub into `expenses`

```js
Object.assign(expenses, PubSub);
```

- Combines the `expenses` object with all methods of `PubSub` using `Object.assign`.
- This gives `expenses` the ability to:
  - `subscribe()` to events (e.g., other modules can listen for changes)
  - `publish()` events (e.g., updates to the UI)

---

## Export the `expenses` Object

```js
export default expenses;
```

- Makes `expenses` available for use in other modules (like `main.js`).

---

## Summary

| Feature            | Responsibility                          |
|--------------------|------------------------------------------|
| `list`             | Stores all expense items                 |
| `addExpense()`     | Adds one or more expenses                |
| `removeExpense()`  | Deletes one expense by index             |
| `filterExpense()`  | Returns matching expenses based on input |
| `editExpense()`    | Updates a single expense                 |
| `clear()`          | Clears all expenses                      |
| `publish()`        | Notifies subscribers of changes          |
| `subscribe()`      | Allows external code to listen to changes|

---

This file acts as the **central state manager** of the application. All UI rendering should subscribe to the `"update"` event to stay in sync with the latest data.


### Step 3: Mix with Pub/Sub

```js
Object.assign(expenses, PubSub);
export default expenses;
```

> This gives the `expenses` object the ability to subscribe and publish events, enabling real-time UI updates.

---

## `js/main.js` – Glue Everything Together

### Import Dependencies

```js
import './components/expense-card.js';
import './components/expenses-container.js';

import theExpenses from './expense-data.js';
import expenses from './expenses.js';
```

> Loads custom elements and data.

---

### Initialize Expense List & Subscriptions

```js
const expenseContainer = document.querySelector('expense-container');

expenses.subscribe("update", (expenses) => {
  expenseContainer.setAttribute('expenses', JSON.stringify(expenses));
});
```

> Any update to the expenses will re-render the container via attribute change.

---

### Load Default Expenses

```js
expenses.clear();
expenses.addExpense(...theExpenses);
```

> Clear any existing data and populate the list with initial values.

---

### Add Live Search

```js
document.getElementById("searchbox").addEventListener("input", (e) => {
  const input = e.target.value;
  if (input.length > 0) {
    expenses.filterExpense(input);
  } else {
    expenses.clear();
    expenses.addExpense(...theExpenses);
  }
});
```

> Reactively filters the list as the user types.

---

### Handle Add Expense Form

```js
document.getElementById("expense-form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const amount = document.getElementById("amount").value;

  if (title && category && date && amount) {
    expenses.addExpense({ title, category, date, amount });
    e.target.reset();
  }
});
```

> Adds a new expense to the list and triggers UI update.

---


