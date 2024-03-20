"use strict";

// ---- ---- ES6 Inheritance ---- ----
/* 
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

class Student extends Person {
  constructor(fulllName, birthYear, course) {
    super(fulllName, birthYear);
    this.course = course;
  }

  calcAge() {
    console.log("Overrided");
  }
}

*/

////////////////////////////////////////////////////////////////
// Inheritance Between "Classes": Object.create
/* 
const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  // For Sarah
  // ENTIRELY NOT constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
console.log(jay.__proto__ === StudentProto);
console.log(jay.__proto__.__proto__ === PersonProto);

jay.init("Jay", 1983, "Computer Science");
jay.introduce();
console.log(jay);
*/

////////////////////////////////////////////////////////////////
// Another Class Example
/* 
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // Convention for protected properties;
    // Still can access to that property, but people will know that this property are not supposed to be accessed without class
    // Otherwise, everything will still be public
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    typeof val === number && this._movements.push(val);
  }

  withdraw(val) {
    typeof val === number && this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    this._approveLoan(val) && this.deposit(val);
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);
*/

////////////////////////////////////////////////////////////////
// The Future of The Class
/* 
class Account {
  // Public fields; Exist in the instance, NOT in its prototype
  locale = navigator.language;

  // Private fields; Truly NOT accessible from outside
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public methods
  // Public interface
  getMovements() {
    return this.#movements; // Accessible to private fields
  }

  deposit(val) {
    typeof val === "number" && this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    typeof val === "number" && this.deposit(-val);
    return this;
  }

  _approveLoan(val) {
    return typeof val === "number";
  }

  requestLoan(val) {
    this._approveLoan(val) && this.deposit(val);
    return this;
  }

  // Private methods (Currently, handled as same as private fields)
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);
// console.log(acc1.#movements);

acc1.deposit(1500).withdraw(1000).requestLoan(10000).withdraw(5000);
console.log(acc1.getMovements());
*/
