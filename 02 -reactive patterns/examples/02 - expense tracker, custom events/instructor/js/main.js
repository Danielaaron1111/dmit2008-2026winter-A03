import './components/expense-card.js'
import './components/expenses-container.js'

import theExpenses from './expense-data.js';
import expenses from './expenses.js';

const expenseContainer=document.querySelector('expense-container');

expenses.subscribe("update", (expenses) => {
    expenseContainer.setAttribute('expenses', JSON.stringify(expenses));
});

expenses.clear();
expenses.addExpense(...theExpenses);

// pre-existing: live search via pub/sub event handler
document.getElementById("searchbox").addEventListener("input", (e) => {
    const input = e.target.value;
    if(input.length > 0) {
        expenses.filterExpense(input);
    } else {
        expenses.clear();
        expenses.addExpense(...theExpenses);
    }
});

// pre-existing: form submission via pub/sub event handler
document.getElementById("expense-form-add").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;

    const submitButton = document.getElementById("submitter")
    // check button text to determine add vs. edit, just like before
    if (submitButton.innerText === "Add Expense") {
        if(title && category && date && amount) {
            expenses.addExpense({title, category, date, amount});
            e.target.reset();
        }
    } else { // allow editing to occur otherwise
        // if we're in this branch of logic, it means submit button DOESN'T say "add expense" 
        const id = Number(document.getElementById("expense-id").value)
        expenses.editExpense(id, { title, category, date, amount })
        // then, reset state of button after submit
        e.target.reset();
        submitButton.innerText = "Add Expense";
    }
});

// Step 3: add listener to our custom delete event
expenseContainer.addEventListener("expense-delete", (e) => {
    const id = Number(e.detail.id);
    console.log("Delete event received for ID:", id);
    expenses.removeExpense(id);
});

// Step 4: add listener to our custom edit event
expenseContainer.addEventListener("expense-edit", (e) => {
  // when the custom edit event fires...
  // first, change the button text -> this will put us in the edit branching logic of our form
  document.getElementById("submitter").innerText = "Edit";
  // then, populate form fields with data
  const { id, title, category, date, amount } = e.detail; // "destructuring"
  console.log("Edit event received for ID:", id);
  // populate the input fields with the values from the event message payload
  document.getElementById("title").value = title;
  document.getElementById("category").value = category;
  document.getElementById("date").value = date;
  document.getElementById("amount").value = amount;
  document.getElementById("expense-id").value = Number(id);
});
