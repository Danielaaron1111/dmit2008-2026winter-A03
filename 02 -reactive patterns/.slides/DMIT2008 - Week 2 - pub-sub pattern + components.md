
# Lessons Learned: Web Components & Design Patterns in `expense-card` and `expense-container`

## 1. Overview of the UI Components

### `expense-card`
- A reusable **Web Component** for displaying a single expense entry.
- Uses Shadow DOM to encapsulate styles and DOM structure.
- Displays title, category, date, amount, and two action buttons (Edit/Delete).
- Data is passed via attributes and rendered on `connectedCallback`.

### `expense-container`
- Another Web Component that acts as a container for multiple `expense-card`s.
- Accepts a JSON stringified array of expenses as an attribute (`expenses`).
- Reactively renders its content by observing the `expenses` attribute using:
  - `observedAttributes`
  - `attributeChangedCallback`

## 2. What is a Design Pattern?

- A **design pattern** is a general reusable solution to a common problem in software design.
- They help improve code **organization**, **reusability**, **communication**, and **scalability**.
- The most well-known collection of patterns comes from the **Gang of Four (GoF)**, who categorized them into:
  - **Creational**
  - **Structural**
  - **Behavioral**

## 3. Design Patterns Demonstrated

### 3.1 **Composite Pattern** (Structural)
> Used when individual objects and groups of objects should be treated the same way.

- **Where?** In `expense-container`
- It holds multiple `expense-card` components and renders them uniformly.
- Even though each card is independent, they are composed together as a collection.

```js
expenses.forEach(exp => {
  const card = document.createElement("expense-card");
  // ...
  this.container.appendChild(card);
});
```

---

### 3.2 **Observer Pattern** (Behavioral)
> Defines a one-to-many dependency so that when one object changes state, all its dependents are notified.

- **Where?** In the use of `attributeChangedCallback` in `expense-container`.
- When the `expenses` attribute is changed, the component automatically re-renders.

```js
attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'expenses' && oldValue !== newValue) {
    this.renderExpenses();
  }
}
```

---

## 4. Lessons Learned

- **Web Components are modular**: You can break down UI into isolated, reusable blocks.
- **Attributes are powerful**: Especially when combined with lifecycle methods and `observedAttributes`.
- **Composition makes UI scalable**: `expense-container` can handle any number of `expense-card`s.
- **Design Patterns are everywhere**: Even in small UI components, several patterns can appear naturally.
- **Shadow DOM helps with style encapsulation**: No global style leaks or interference.

---