
// 1. import data
import theExpenses from "./expense-data.js";

// 2. get expense container & list elements
const expenseContainer = document.getElementById("expense-container")
const expenseList = document.getElementById("expense-list")

// 3. create a function to render our expenses
function renderExpenses(expenses) {
    // first, clear existing container contents
    expenseContainer.innerHTML = "";

    // render out a card for each expense in data
    expenses.forEach((expense) => { 
        expenseContainer.innerHTML += `
        <div class="card" id="${expense.id}">
          <div class="header">
            <div>
              <div class="title">${expense.title}</div>
              <div class="meta category">${expense.category}</div>
            </div>
            <div class="amount">$${expense.amount}</div>
          </div>
          <div class="meta date">${expense.date}</div>
          <div class="actions">
            <button class="edit-btn" id=${expense.id}>Edit</button>
            <button class="delete-btn" id=${expense.id}>Delete</button>
          </div>
        </div>            
        `;
    });
}

renderExpenses(theExpenses);

// 3. handle behaviour for form submission
document.getElementById("expense-form-add").addEventListener(
    "submit",
    function (event) {

        event.preventDefault() // prevent default HTML form submission behaviour

        // generate objects with values from DOM input fields
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;
        const amount = document.getElementById("amount").value;

        // add a new expense to the data container if our submit button was clicked
        if (document.getElementById("submiter").innerText === "Add Expense") {
            const newExpense = {
                id: theExpenses.length + 1, // basic way to auto-increment IDs
                title,
                category,
                date,
                amount,
            };

            theExpenses.push(newExpense) // add our new expense to the data array
            renderExpenses(theExpenses)  // re-render expenses
            this.reset();
        } else {
            const expenseId = parseInt(document.getElementById("expense-id").value); // get hidden ID input from input fields
            const expenseToEdit = theExpenses.find(
                (expense) => expense.id === expenseId
            ); // match an actual data element in expense container by id
            if (expenseToEdit) {  // first, make sure we actually got an object!
                expenseToEdit.title = title;
                expenseToEdit.category = category;
                expenseToEdit.date = date;
                expenseToEdit.amount = amount;
                this.reset();
                document.getElementById("submiter").innerText = "Add Expense";
                renderExpenses(theExpenses);
            }
        }
    }
)

// 4. simple searchbox filter
document.getElementById("searchbox").addEventListener(
    "input",  // logic will fire every time there's input change in the searchbox
    function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredExpenses = theExpenses.filter(
            (expense) => expense.title.toLowerCase().includes(searchTerm)
        );
        renderExpenses(filteredExpenses);
    }
)

// 5. edit & delete buttons
//    I could attach a click event listener to every single button, e.g. when I render the cards
//    ->  *or*, I can attach *one* event listener to the overall container, and then differentiate specifics
//        based on (in this case) the button class I've assigned (edit vs. delete) and the id for each card.
expenseContainer.addEventListener(
    "click",  // any click event inside this container. I'll differentiate later
    function (event) {
        // a) implement logic for delete button
        if (event.target.classList.contains("delete-btn")) {
            const expenseId = parseInt(event.target.id);
            const expenseIndex = theExpenses.findIndex(
                // you would use IndexOf for primitive types, and findIndex for e.g. objects
                (expense) => expense.id === expenseId
            );
            if (expenseIndex != -1) { // because findIndex returns -1 if it can't find a matching element
                theExpenses.splice(expenseIndex, 1); // mouse over splice if you're confused about these params
                renderExpenses(theExpenses);
            }
        // b) implement logic for edit button
        } else if (event.target.classList.contains("edit-btn")) {
            const expenseId = parseInt(event.target.id);
            const expenseToEdit = theExpenses.find(
                (expense) => expense.id === expenseId
            );
            if (expenseToEdit) {
                document.getElementById("title").value = expenseToEdit.title;
                document.getElementById("amount").value = expenseToEdit.amount;
                document.getElementById("category").value = expenseToEdit.category;
                document.getElementById("date").value = expenseToEdit.date;
                document.getElementById("expense-id").value = expenseToEdit.id;
                // remember how we were checking whether to create or edit based on the submit button's text?
                document.getElementById("submiter").innerText = "Save Changes";

            }
        }
    }
)