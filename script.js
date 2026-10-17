"use strict";

/*
  JavaScript Midterm
  Mini Expense Tracker
*/

// ------------------------------------
// 1. SELECT DOM ELEMENTS
// ------------------------------------

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addButton = document.getElementById("add-expense");
const resetButton = document.getElementById("reset");
const messageText = document.getElementById("message");
const expenseCount = document.getElementById("expense-count");
const expenseList = document.getElementById("expense-list");
const totalText = document.getElementById("total");
const budgetStatus = document.getElementById("budget-status");

// Save the original empty list so Reset can bring it back
const emptyListHTML = expenseList.innerHTML;

// ------------------------------------
// 2. APPLICATION DATA
// ------------------------------------

// Empty array that will hold every expense the user adds
let expenses = [];

// The budget limit
const BUDGET = 500;

// ------------------------------------
// 3. FUNCTIONS
// ------------------------------------

// Shows a success or error message under the buttons
function showMessage(text, type) {
  messageText.textContent = text;
  messageText.className = "message " + type; // type is "error" or "success"
}

// Adds an expense when the Add Expense button is clicked
function addExpense() {
  // Read the input values
  const description = descriptionInput.value.trim();
  const amountValue = amountInput.value.trim();
  const category = categorySelect.value;

  // Inputs are strings, so convert the amount into a number
  const amount = Number(amountValue);

  // Validate the input
  if (description === "") {
    showMessage("Please enter a description.", "error");
    return;
  }

  if (amountValue === "") {
    showMessage("Please enter an amount.", "error");
    return;
  }

  if (isNaN(amount)) {
    showMessage("Please enter a valid number for the amount.", "error");
    return;
  }

  if (amount <= 0) {
    showMessage("The amount must be greater than 0.", "error");
    return;
  }

  // Create the expense object
  const expense = {
    description: description,
    amount: amount,
    category: category
  };

  // Add the expense object to the array
  expenses.push(expense);

  showMessage("Expense added successfully!", "success");

  // Update the page
  displayExpenses();
  updateTotal();
  updateBudgetStatus();

  // Clear the form for the next expense
  clearForm();
}

// Displays every expense in the array on the page
function displayExpenses() {
  // Clear the list before rebuilding it
  expenseList.innerHTML = "";

  // Loop through the expenses array
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    // One row for each expense
    const item = document.createElement("div");
    item.className = "expense-item";

    const descriptionEl = document.createElement("span");
    descriptionEl.className = "expense-description";
    descriptionEl.textContent = expense.description;

    const categoryEl = document.createElement("span");
    categoryEl.className = "expense-category";
    categoryEl.textContent = expense.category;

    const amountEl = document.createElement("span");
    amountEl.className = "expense-amount";
    amountEl.textContent = "$" + expense.amount.toFixed(2);

    item.appendChild(descriptionEl);
    item.appendChild(categoryEl);
    item.appendChild(amountEl);

    expenseList.appendChild(item);
  }

  // Update the expense count
  expenseCount.textContent = expenses.length + " Expenses";
}

// Calculates the total of all expenses
function calculateTotal() {
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }

  return total;
}

// Shows the total on the page with two decimal places
function updateTotal() {
  const total = calculateTotal();
  totalText.textContent = "$" + total.toFixed(2);
}

// Checks if the user is under or over budget
function updateBudgetStatus() {
  const total = calculateTotal();

  if (total <= BUDGET) {
    budgetStatus.textContent = "You are under budget.";
    budgetStatus.className = "budget-status under-budget";
  } else {
    budgetStatus.textContent = "You are over budget.";
    budgetStatus.className = "budget-status over-budget";
  }
}

// Clears the form fields
function clearForm() {
  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0; // back to the default option (Food)
}

// Resets the whole application back to how it started
function resetApp() {
  expenses = [];

  expenseList.innerHTML = emptyListHTML;
  expenseCount.textContent = "0 Expenses";
  totalText.textContent = "$0.00";

  budgetStatus.textContent = "You are under budget.";
  budgetStatus.className = "budget-status under-budget";

  messageText.textContent = "";
  messageText.className = "message";

  clearForm();
}

// ------------------------------------
// 4. EVENT LISTENERS
// ------------------------------------

addButton.addEventListener("click", addExpense);
resetButton.addEventListener("click", resetApp);
