"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2024-02-11T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-06T16:33:06.386Z",
    "2024-02-08T14:43:26.374Z",
    "2024-02-11T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const loginDuration = 5 * 60;
let currentAccount,
  sorted = false,
  timer;

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = "";
  const movements = sort
    ? [...acc.movements].sort((a, b) => a - b)
    : acc.movements;

  movements.forEach((mov, i) => {
    const { locale, currency } = acc;
    const type = mov > 0 ? "deposit" : "withdrawal";
    const timeFormatted = formatMovementTime(
      new Date(acc.movementsDates[i]),
      locale
    );
    const movFormatted = formatCurrency(mov, locale, currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
        </div>
        <div class="movements__date">${timeFormatted}</div>
        <div class="movements__value">${movFormatted}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (movements) =>
  movements.reduce((acc, cur, i) => acc + cur, 0);

const displayBalance = (acc) => {
  acc.balance = calcDisplayBalance(acc.movements);
  const { balance, locale, currency } = acc;
  labelBalance.textContent = `${formatCurrency(balance, locale, currency)}`;
};

const displaySummary = (acc) => {
  // Don't overuse chaining methods
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outcomes = Math.abs(
    acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  const interest = incomes * (acc.interestRate / 100);
  labelSumIn.textContent = `${formatCurrency(
    incomes,
    acc.locale,
    acc.currency
  )}`;
  labelSumOut.textContent = `${formatCurrency(
    outcomes,
    acc.locale,
    acc.currency
  )}`;
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const displayCurrentTime = (locale = "en-US") => {
  labelDate.textContent = formatTime(new Date(), locale, true);
};

const setTimer = (duration, display, onExpire) => {
  const format = (time) => parseInt(time, 10).toString().padStart(2, "0");
  const updateDisplay = (time) => {
    const minutes = format(time / 60);
    const seconds = format(time % 60);
    display.textContent = `${minutes}:${seconds}`;
  };
  const tick = () => {
    if (duration >= 0) {
      updateDisplay(duration);
    } else {
      clearInterval(timer);
      display.textContent = "00:00";
      if (typeof onExpire === "function") onExpire();
    }
    duration--;
  };

  updateDisplay(duration);
  const timer = setInterval(tick, 1000);
  return timer;
};

const setLogoutTimer = (duration, display) => {
  const onExpire = () => {
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
  };

  return setTimer(duration, display, onExpire);
};

const formatTime = (date, locale = "en-US", isDatetime = false) => {
  const defaultOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const options = isDatetime
    ? {
        ...defaultOptions,
        dayPeriod: "narrow",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    : defaultOptions;

  return new Intl.DateTimeFormat(locale, options).format(date);
  // const pad = (num) => num.toString().padStart(2, "0");
  // const year = date.getFullYear();
  // const month = pad(date.getMonth() + 1);
  // const day = pad(date.getDate());
  // const hour = pad(date.getHours());
  // const min = pad(date.getMinutes());

  // const dateString = `${day}/${month}/${year}`;
  // const timeString = `${hour}:${min}`;

  // return isDatetime ? `${dateString}, ${timeString}` : dateString;
};

const formatMovementTime = (date, locale) => {
  const daysPassed = Math.floor((new Date() - date) / (24 * 60 * 60 * 1000));

  if (daysPassed === 0) return "today";
  if (daysPassed === 1) return "yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return formatTime(date, locale, false);
};

const formatCurrency = (value, locale = "en-US", currency = "USD") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);

const clearInputValues = (...inputs) => {
  inputs.forEach((input) => (input.value = ""));
};

const updateLogoutTimer = () => {
  clearInterval(timer);
  timer = setLogoutTimer(loginDuration, labelTimer);
};

const updateUI = (acc) => {
  displayMovements(acc);
  displayBalance(acc);
  displaySummary(acc);
  displayCurrentTime(acc.locale);
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

    if (timer) clearInterval(timer);
    timer = setLogoutTimer(loginDuration, labelTimer);

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

    const now = new Date().toISOString();
    currentAccount.movementsDates.push(now);
    receiverAccount.movementsDates.push(now);

    updateLogoutTimer();

    updateUI(currentAccount);
    alert("Succeeded to transfer🚀");
    return;
  }
  alert("Failed to transfer❌");
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  clearInputValues(inputLoanAmount);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    const now = new Date().toISOString();
    currentAccount.movementsDates.push(now);

    updateLogoutTimer();

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

    if (timer) clearInterval(timer);

    alert("Succeeded to delete the account🚀");
    return;
  }

  updateLogoutTimer();
  alert("Failed to delete the account❌");
});

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;

  updateLogoutTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// ---- ---- Convert and Check Numbers
/*
// Binary
console.log(23 === 23.0);
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number("23"));
console.log(+"23");

// Parsing
console.log(Number.parseInt("30px", 10));
console.log(Number.parseInt("e23", 10));
console.log(Number.parseInt("30px", 2));
console.log(Number.parseFloat("   2.5rem   "));

// Check if value is NaN
Number.isNaN;

// Check if value is number
Number.isFinite;
Number.isInteger;
*/

// ---- ---- Math and Rounding ---- ----
/*
console.log(8 ** (1 / 3));
// Math: max, min, PI, random, round, ceil, floor, trunc
// randomInt

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.34567).toFixed(3));
*/

// ---- ---- The Remainder Operator ---- ----
/*
const isEven = (n) => n % 2 === 0;
*/

// ---- ---- Numeric Sepeartor ---- ----
/* 
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

// Max Integer
const theBiggestNumber = 2**53-1;
console.log(theBiggestNumber);
console.log(Number.MAX_SAFE_INTEGER);

// Big Integer
console.log(12343458354090329524n);
console.log(BigInt(12343458354090329524));

// Operations: Only with the same Big Int type  
console.log(324864783659689n * 100000n);
console.log(20n>15); // true

// console.log(Math.sqrt(16n)) // doesn't work
console.log(20n === 20); // false
console.log(typeof 20n);

// Divisions
console.log(10n/3n);
console.log(10/3);
*/

// ---- ---- Dates ---- ----
/* 
const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2020 18:05:41"));
console.log(new Date("December 24, 2015"));
console.log(new Date(2037, 10, 19, 15, 23, 5));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

/*
// Working with dates
console.log(new Date());
console.log(Date.now());

const future = new Date(2037, 10, 19,15,23);
console.log(future);
console.log(future.getFullYear()) // ❌ getYear()
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

future.setFullYear(2040);
console.log(future);
*/

// ---- ---- Operation with Date ---- ----
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const date1 = new Date(2037, 10, 19, 16, 7);
const date2 = new Date(2037, 11, 2, 15, 23);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(date1, date2));
*/

// ---- ---- Inernationalizing Dates (Intl) ---- ----
// Experimenting API
/*
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", // long
  year: "numeric",
  weekday: "numeric", // long
};
const locale = navigator.language;
console.log(locale);

console.log(new Intl.DateTimeFormat("en-US", options).format(now));
console.log(new Intl.DateTimeFormat("ar-SY", options).format(now));
console.log(new Intl.DateTimeFormat(locale, options).format(now));
*/

// ---- ---- Inernationalizing Number (Intl) ---- ----
/*
const num = 3884764.23;
const options = {
  style: "unit", // percent, currency
  unit: "mile-per-hour", // "celsius"
  currency: "EUR",
  // useGrouping: false,
};

console.log("US: ", new Intl.NumberFormat("en-US").format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE").format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY").format(num));
console.log("Browser: ", new Intl.NumberFormat(navigator.language).format(num));
*/

// ---- ---- Timers ---- ----
// setTimeout
/* 
const ingredients = ["olives", "pepperoni", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) =>
    console.log(`Here is your pizza with ${ing1}, ${ing2} and ${ing3}`),
  3000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);


// setInterval
*/
