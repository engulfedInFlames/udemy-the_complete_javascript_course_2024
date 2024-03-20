"use strict";

// ---- ---- Function Constructor ---- ----
// When calling function constructor...
// 1. New {} is created
// 2. Function is called → this = {};
// 3. {} linked to prototype ✅
// 4. Function automatically return {}

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never created a method inside of the constructor
  // All instances will have all those methods.
  // this.calcAge = function() {
  //   console.log(2024 - this.birthYear);
  // }
};

const john = new Person("John", 1997);
console.log(john);
console.log(john instanceof Person);

// ---- ---- Prototypes ---- ----
// Prototypal Inheritance: Every instance inherits its prototype
Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};
// Prototypal Inheritance (DELEGATION)
john.calcAge(); // john.__proto__.calcAge()

console.log(Person.prototype);
console.log(john.__proto__);
console.log(Person.prototype === john.__proto__);
console.log(Person.prototype.isPrototypeOf(john));
// .prototype is NOT of Person, BUT objects created by Person
console.log(Person.prototype.isPrototypeOf(Person));

// .prototypeOfLinkedObjects
Person.prototype.species = "Homo Sapiens";
console.log(john.species);

console.log(john.hasOwnProperty("firstName"));
console.log(john.hasOwnProperty("species"));
console.log(john.__proto__.hasOwnProperty("species"));

// ---- ---- Prototypal Inheritance & Prototype Chain ---- ----
console.log(john.__proto__.__proto__); // Object.prototype
console.log(john.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

// Adding methods in prototype directly is not recommended
console.log(arr.unique());
