
# JavaScript Event Loop, Concurrency, and Asynchronous Programming

---

## 1. JavaScript Event Loop and Concurrency

Reference: https://dev.to/dipakahirav/understanding-the-event-loop-and-concurrency-model-in-javascript-1ml2

JavaScript is single-threaded, meaning it can run **one piece of code at a time** on the main thread. However, it can manage asynchronous tasks through the **event loop**.
### How it work:

Here i don't want to explain the process fully. You can read from the link i have provided but in summary:
- imagin every JS code is inside a function, even on root of a js file. 
- We have a repository is called `call stack`. at the begining the whole code of a js page is in a global function pass to call stack and every thing start from call stack.
- it start executing the first function of call stack and put every function call on call stack
```js
function foo() {
  console.log('foo');
}

function bar() {
  foo();
  console.log('bar');
}

bar();
```
- When bar() is called, it goes on top of the stack.
- Inside bar(), foo() is called, so it’s placed on top of bar().
- When foo() finishes, it’s removed from the stack, and bar() continues.
- now imagin we reach to an async code, (a timer or promise (like fetch))
- in JS every Async call has a callback function. JS put this callback on a callback queue and just execute it when it's ready to execute
- but it will execute just when call stack is empty. it means there is no syncronized code to execute.

### A sample
```js
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
})

console.log('End');
```
**Step-by-Step Execution:**

- `console.log('Start')` is added to the call stack and runs immediately, logging "Start".
-- `setTimeout` is called, which registers a task in the Web API to run after `0`ms. Its callback is placed in the Callback Queue.
-- `Promise.resolve().then(...)` creates a microtask (Async, but has higher priority than timer). The callback for this microtask is placed in the Microtask Queue.
- `console.log('End')` is added to the stack and runs immediately, logging "End".
- At this point, the stack is empty. The Event Loop checks the Microtask Queue first:
  - The first promise callback runs, logging "Promise".
  - The `setTimeout` callback runs, logging "setTimeout".
```output
Start
End
Promise
setTimeout
```

## 2. Promises and `.then()`, `.catch()`, `.finally()`

A Promise in JavaScript is an object representing the eventual outcome of an asynchronous operation. It acts as a placeholder for a value that might not be available immediately. Promises help manage asynchronous code, making it more organized and readable. 

### Promise States

- **Pending**: Initial state
- **Fulfilled**: Resolved successfully
- **Rejected**: Failed with an error

### Basic Usage

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise
  .then(result => console.log(result)) // "Done!"
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs"));
```

- `.then()` handles successful results
- `.catch()` handles errors
- `.finally()` runs regardless of the outcome

### Chaining Promises
If in the `then` part of a promise, you return another promise, you can make a chain of then

```js
fetch("/api/user")
  .then(res => res.json())
  .then(user => fetch(`/api/posts?userId=${user.id}`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error("Error:", err));
```
---

## 3. Asynchronous Programming with `async/await`

`async/await` is syntactic sugar for Promises. It allows writing asynchronous code in a synchronous style.
It seams `await` can stop execution untill the result of esync function get ready.
But `await` never cannot delay the execution of JS until the result of the async code get ready.Why? because you MUST use await on a async function. 
### Basic Usage

```js
async function fetchData() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}
```

- `async` functions always return a promise.
- `await` pauses execution until the promise resolves.

---

## 4. Error Handling in Async Programming

### Try/Catch with `async/await`

```js
async function getUserData() {
  try {
    const res = await fetch("/api/user");
    const user = await res.json();
    console.log(user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
```

> Use `try/catch` blocks around `await` for better error control.

## 5. Advanced Promise Combinators

### `Promise.all([...])`

Waits for **all promises** to resolve. Fails fast if one rejects.

```js
Promise.all([fetch("/api/1"), fetch("/api/2")])
  .then(responses => console.log("All done", responses))
  .catch(error => console.error("One failed", error));
```

### `Promise.race([...])`

Resolves or rejects as soon as **any promise** settles.

```js
Promise.race([slowPromise, fastPromise])
  .then(result => console.log("First finished:", result))
  .catch(error => console.error("First failed:", error));
```

### `Promise.any([...])`

Returns the first **fulfilled** promise. Ignores rejections unless all fail.

```js
Promise.any([
  Promise.reject("fail"),
  Promise.reject("fail"),
  Promise.resolve("success")
])
.then(value => console.log("Resolved:", value))
.catch(error => console.error("All failed"));
```

---
Use Promises and `async/await` wisely to write readable, efficient, and non-blocking JavaScript code.
