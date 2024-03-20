"use strict";

// prettier-ignore
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Make object immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (
  budget,
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();

  // This creates a new object and does not mutate the original object
  // However, it also creates so many new objects, which is not good for performance
  return value <= getLimit(user)
    ? [...budget, { value: -value, description: description, user: cleanUser }]
    : budget;
};

// In the real world, we use compoisition instead of chaining function like this
// Composition is a way to combine simple functions to build more complicated ones
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
// prettier-ignore
const newBudget2 = addExpense(newBudget1,spendingLimits,100,"Going to movies 🍿","Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = (budget, limits) =>
  budget.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = (budget, limit) => {
  const bigExpenses = budget
    .filter((entry) => entry.value <= -limit)
    .map((entry) => entry.description.slice(0, 2))
    .join(" / ");
  // .reduce((str, cur) => `${str}${cur.description.slice(-2)} / `, " ", "");
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 1000);
