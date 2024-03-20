"use strict";

// Warning: When you pass an objects as an argument, that argument point the original address of the object.

// ---- ---- How passing arguments in JS ---- ----
/*
const passenger = {
  name: "John Doe",
  age: 24,
};
const seatNumber = "F4";

const checkIn = (passenger, seatNumber) => {
  seatNumber = "G1";
  passenger.name = "Mr." + passenger.name;
  passenger["seatNumber"] = seatNumber;
};

checkIn(passenger, seatNumber);

console.log(passenger);
console.log(seatNumber);
*/

// ---- ---- First-class Functions ---- ----
// Functions are just another "type" of object

// ---- ---- Higher-order Functions ---- ----
// Functions that receives another function as an argument or,
// that return a new function or, both.
// Pass functions as arguments (so-called callbacks) to indicate what exactly they should do

// ---- ---- The `call` and `apply` methods ---- ----
// `apply` method is not used in modern js.
// You can acheive the same effect only with `call` method.
// Search examples...

// ---- ---- The `bind` method ---- ----
// Search examples...

// ---- ---- Immediately Invoked Function Expressions (IIFE) ---- ----
// Useful in async - await
/*
(function () {
  // Data defined in this scope exists only  in this function scope
  // You can protect data or escape from the scope chain
  console.log("This will never run again");
})();

(() => console.log("This will ALSO never run again"))();
*/
