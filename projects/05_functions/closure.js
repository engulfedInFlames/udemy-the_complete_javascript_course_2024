"use strict";

// ---- ---- Closure ---- ----
const booking = () => {
  let passengerCount = 0;

  return () => {
    passengerCount++;
    console.log(`${passengerCount} passengers booked`);
  };
};

// ↓ 1.
[1, 2, 3, 4, 5].forEach(() => booking()());

// ↓ 2.
const counter = booking();
[1, 2, 3, 4, 5].forEach(() => counter());

// How is this possible?
// As long as the `counter` variable is created and lives in,
// `passengerCount` has the same lifecycle with `counter`.
// Some ways of defining `closure`
// 1. The closed-over variable environment of the execution context in which a function was created, even after that execution context is gone
// 2. A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// 3. A closure makes sure that a function doesn't loose connection to variables the existed at the function's birth palce.
// ❗Be aware that you cannot access the internal variables but can just see what happens.
// ❗Be aware that closure has a priority over the scope chain

// ---- ---- Closure Examples ---- ----

let f;
const g = function () {
  const a = 15;
  // Create closure
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 999;
  // Create closure
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // At this point, `g` function has already finished its execution
h();
f(); // At this point, `h` function has already finished its execution
