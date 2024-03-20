"use strict";

// 1. All methods in class follow prototypal inheritance
// 2. Classes are NOT hoisted; Do not use before it is declared
// 3. Class are first-class citizens; Can use it as argument or return value
// 4. Classes are executed in strict mode

// class expression
// const Person = class {}

// class declaration
class Person {
  constructor(fullname, birthYear) {
    this.fullname = fullname;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2024 - this.birthYear);
  }

  greet() {
    console.log(`Hello! My name is ${this.firstName}`);
  }

  get age() {
    return 2024 - this.birthYear;
  }

  // ↓ NOT used often
  // Set a property that already exists
  set fullname(name) {
    // if (name.includes(" ")) this.fullname = name; ❌ Cause conflit
    if (name.includes(" ")) this._fullname = name;
    else alert(`${name} is not a full name!`);
  }

  get fullname() {
    return this._fullname;
  }

  // ---- ---- Static Method ---- ----
  static hey() {
    console.log("Hey there👋");
    console.log(this);
  }
}

const jessica = new Person("Jessica Davis", 1996);
console.log(jessica);
console.log(jessica.__proto__ === Person.prototype);

// Person.prototype.greet = function () {
//   console.log(`Hello! My name is ${this.firstName}`);
// };

jessica.greet();

console.log(jessica.age);

// ---- ---- Getter & Setter ---- ----
// Work in any regular JS objects
const account = {
  owner: "John",
  movements: [200, -530, 120, 300],

  get latest() {
    // return this.movements.slice(-1).pop();
    return this.movements.at(-1);
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

// ---- ---- Static Method ---- ----
// Person.hey();
