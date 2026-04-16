import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react';

import TodoList from '../components/TodoList'


// our first test will be a 'dummy test' just to get familiar with syntax
// (I don't *need* to be testing something like, does an MUI Typography component
// actually render).
test(
    'todo list title renders correctly', // param 1: name of test
    () => {                              // param 2: callback for the test logic itself
      // setup - N.B. it's pretty goofy to be grabbing elements by on-screen value, rather
      //        than attributes/IDs etc. but again this is just to show you the basics of a test
      render(<TodoList />)  // we're rendering JSX, not just naming components as inputs
      const title = screen.getByText("Our Todo List")

      // test
      expect(title).toBeInTheDocument()
    }
)

test('add button renders correctly', () => {
  // 1. setup
  render(<TodoList />)
  // instead of just selecting by rendered values on-'screen' (finnicky because once your UI
  // gets more complex, e.g. what if two fields or display elements have the same value?)
  // we can provide a 'data-testid' attribute/prop in a component and select it more precisely!
  const addButton = screen.getByTestId("add-new-todo-button")

  // test
  expect(addButton).toBeInTheDocument()
})

test('new todo item is added successfully', () => {
  // 1. setup
  const EXPECTED_STRING = "Learning testing in JS & React"

  render(<TodoList />)
  const inputText = screen.getByLabelText("New Todo") // <- another selector via 'label' prop/attr
  const addButton = screen.getByTestId("add-new-todo-button")
  const todoList  = screen.getByTestId("todo-item-list")

  // 2. act / execute logic
  fireEvent.change( // simulate a 'change' event, e.g. what a drop-down or text input would fire
    inputText,                            // param 1: the element 'emitting' the event
    { target: { value: EXPECTED_STRING} } // param 2: the event object
  )

  // 3. test that the element now contains this value
  expect(inputText.value).toBe(EXPECTED_STRING)
})