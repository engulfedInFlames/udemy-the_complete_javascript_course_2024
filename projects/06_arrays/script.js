"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// Elements
const getElementBySelector = (selector) => document.querySelector(selector);
const labelWelcome = getElementBySelector(".welcome");
const labelDate = getElementBySelector(".date");
const labelBalance = getElementBySelector(".balance__value");
const labelSumIn = getElementBySelector(".summary__value--in");
const labelSumOut = getElementBySelector(".summary__value--out");
const labelSumInterest = getElementBySelector(".summary__value--interest");
const labelTimer = getElementBySelector(".timer");

const containerApp = getElementBySelector(".app");
const containerMovements = getElementBySelector(".movements");

const btnLogin = getElementBySelector(".login__btn");
const btnTransfer = getElementBySelector(".form__btn--transfer");
const btnLoan = getElementBySelector(".form__btn--loan");
const btnClose = getElementBySelector(".form__btn--close");
const btnSort = getElementBySelector(".btn--sort");

const inputLoginUsername = getElementBySelector(".login__input--user");
const inputLoginPin = getElementBySelector(".login__input--pin");
const inputTransferTo = getElementBySelector(".form__input--to");
const inputTransferAmount = getElementBySelector(".form__input--amount");
const inputLoanAmount = getElementBySelector(".form__input--loan-amount");
const inputCloseUsername = getElementBySelector(".form__input--user");
const inputClosePin = getElementBySelector(".form__input--pin");

let currentAccount;
let sorted = false;

const displayMovements = (movements, sort = false) => {
  const _movements = sort ? [...movements].sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = "";
  _movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (movements) =>
  movements.reduce((acc, cur, i) => acc + cur, 0);

const displayBalance = (acc) => {
  acc.balance = calcDisplayBalance(acc.movements);
  labelBalance.textContent = `${acc.balance}€`;
};

const displaySummary = (acc) => {
  // Don't overuse chaining methods
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = incomes * (acc.interestRate / 100);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}`;
};

const clearInputValues = (...inputs) => {
  inputs.forEach((input) => (input.value = ""));
};

const updateUI = (acc) => {
  displayMovements(acc.movements);
  displayBalance(acc);
  displaySummary(acc);
};

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  clearInputValues(inputLoginUsername, inputLoginPin);

  currentAccount = accounts.find((acc) => acc.owner === username);

  if (currentAccount?.pin === pin) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;
    updateUI(currentAccount);
    return;
  }

  alert("Invalid username or password");
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const receiver = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  clearInputValues(inputTransferTo, inputTransferAmount);

  const receiverAccount = accounts.find((acc) => acc.owner === receiver);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiver !== currentAccount.owner
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
    alert("Succeeded to transfer🚀");
    return;
  }
  alert("Failed to transfer❌");
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  clearInputValues(inputLoanAmount);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    alert("Succeeded to execute loan🚀");
    return;
  }
  alert("Failed to execute load❌");
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  clearInputValues(inputCloseUsername, inputClosePin);

  if (
    currentAccount &&
    currentAccount.owner === username &&
    currentAccount.pin === pin
  ) {
    const targetIndex = accounts.findIndex((acc) => acc === currentAccount);
    accounts.splice(targetIndex, 1);
    containerApp.style.opacity = 0;
    alert("Succeeded to delete the account🚀");
    return;
  }
  alert("Failed to delete the account❌");
});

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ---- ---- Various Methods of Array ---- ----
/*
let arr = ["a", "b", "c", "d", "e"];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE: Mutation happens
// console.log(arr.splice(2));
arr.splice(-1); // Common convention to remove the last element of the array.
console.log(arr);

// REVERSE: Mutation happens
// CONCAT: Can simply use spread opeartor
// JOIN
*/

// ---- ---- AT ---- ----
/*
const arr = [11,33,55];

// Getting the last element
console.log(arr[arr.length-1]);
console.log(arr.splice(-1)[0]);
console.log(arr.at(-1));
*/

// ---- ---- forEach ---- ----
/*
// Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}; ${value}`);
});

// Set
const currenciesUnique = new Set(["USD", "GBP", "USB", "EUR", "EUR"]);
currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}; ${value}`); // ❓
});
*/

// ---- ---- Array Data Transformation ---- ----
// map, filter, reduce

// ---- ---- some & every ---- ----

// ---- ---- flat & flatMap ---- ----
/*
const arr1 = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr1.flat());
const arr2 = [[[1, 2], 3], [[4, 5], 6], 7, 8, 9];
console.log(arr1.flat(1));
console.log(arr1.flat(2));

const overalBalance1 = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
const overalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance1);
console.log(overalBalance2);
*/

// ---- ---- Sort ---- ----
/*
const movements = [
  400, 250, -120, 600, -1280, 4500, -320, -200, -100, -450, 960, 360, -500,
  3400,
];
// return < 0, (a, b) : Keep order
// return > 0, (b, a) : Switch order

// movements.sort((a, b) => {
//   return a > b ? 1 : -1;
// });
movements.sort((a, b) => {
  return a - b;
});

console.log(movements);

movements.sort((a, b) => {
  return b - a;
});
console.log(movements);
*/

// ---- ---- More ways of creating and filling arrays ----  ----
/*
// fill
const arr1 = new Array(10);
arr1.fill(15, 3, 5);
console.log(arr1);

// Array.from
const arr2 = Array.from({ length: 10 }, () => 1);
console.log(arr2);

const arr3 = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(arr3);

labelBalance.addEventListener("click", () => {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.slice(0, -1))
  );
  // const movementsUI2 = [...document.querySelectorAll(".movements__value")];

  console.log(movementsUI);
});
*/

// Practices
// 1.
/* 
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
const countDepositsMoreThan1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(countDepositsMoreThan1000);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.
const convertTitleCase = (title) => {
  const exceptions = ["a", "an", "the", "but", "and", "or", "on", "in", "with"];
  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return titleCase;
};

console.log(convertTitleCase("this is a title"));
console.log(convertTitleCase("this is a SUBTITLE"));
console.log(convertTitleCase("THIS IS a header WITH description"));
*/
