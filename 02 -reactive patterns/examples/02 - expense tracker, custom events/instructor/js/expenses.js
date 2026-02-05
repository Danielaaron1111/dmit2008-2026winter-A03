// pre-existing: generic pub/sub handler object
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


// pre-existing: specific handler for expenses; uses Object.assign() to borrow 
//               functionality from generic pub/sub handler above 
const expenses = {
  list: [],

  addExpense(...exp) {
    this.list.push(...exp);
    this.publish("update", this.list);
  },

  filterExpense(input) {
    const result = this.list.filter(exp => {
        if(exp.title.toLowerCase().includes(input.toLowerCase()) ||
           exp.category.toLowerCase().includes(input.toLowerCase()) ||
           exp.date.toLowerCase().includes(input.toLowerCase()) ||
           exp.amount.toString().toLowerCase().includes(input.toLowerCase())) {
            return true;
        }
    });
    this.publish("update", result);
  },

  clear() {
    this.list = [];
    this.publish("update", this.list);
  },

  // When working with logic in multiple places, you can just make a skeleton first
  // and implement details later!
  removeExpense(id) {  // I know I'll need at least an ID to identify what to remove
    // I could specifically remove the element from the list, but I can also just filter it out:
    this.list = this.list.filter(expense => expense.id !== id);  // rebuild the array without the matching expense
    this.publish("update", this.list);
  },

  editExpense(id, updatedExpense) {
    const index = this.list.findIndex(expense => expense.id === id);
    if (index !== -1 ) { // someArray.findIndex returns -1 if no matching element
      this.list[index] = {id, ...updatedExpense};
      // ^ expands out into: {id, title, amount, date, category}
      // I've modified my data, so trigger an update/re-render:
      this.publish("update", this.list);
    } else {
      console.error(`No expense with ID ${id} found`);
    }
  },

};

Object.assign(expenses, PubSub);

export default expenses;