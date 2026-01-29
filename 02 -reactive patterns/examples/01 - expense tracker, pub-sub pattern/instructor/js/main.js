import './components/expense-card.js'
import './components/expenses-container.js'

const expenseContainer=document.querySelector('expense-container');
const theExpenses = [
  {id:1, title: "Book", category: "Education", date: "2025-05-11", amount: 15.99 },
  { id:2, title: "Pizza", category: "Food", date: "2025-05-11", amount: 22.5 }
];

expenseContainer.setAttribute('expenses', JSON.stringify(theExpenses));

let oldExpnses=expenseContainer.getAttribute('expenses');
oldExpnses=JSON.parse(oldExpnses);
const newExpnses=oldExpnses.map(item=>{
    item.amount*=1.2;
    return item;
})
expenseContainer.setAttribute('expenses', JSON.stringify(newExpnses));
