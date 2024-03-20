// ---- ---- this ---- ----
// 'var' keyword creates global scope variable
var firstName = "Matilda";

const person = {
  firstName: "John",
  year: 1997,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    /*
      const self = this;
      const isMillenial = function () {
        console.log(self);
        console.log(self.year >= 1981 && self.year <= 1996);
      };
    */

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    // 'this' keyword in regular function means undefined even if the function is located in an object
    /* 😫
      const isMillenial = function() {
        console.log(this);
        console.log(this.year >= 1981 && this.year <= 1996); 
      }
    */
    isMillenial();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

// person.greet(); 😫

// ---- ---- arguments ---- ----
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(1, 3, 5, 7, 9);

const addArrow = (a, b) => {
  // console.log(arguments); 😫
  return a + b;
};

addArrow(2, 4, 6, 8, 10);

// ---- ---- ✨ Primitives vs Objects (Primitive vs Reference Types) ✨ ---- ----
// Primitives are stored in CALL STACK in JS ENGINE
// Objects are stored in HEAP in JS ENGINE
// To understand the mechanism of CALL STACK  and HEAP is very important
// 'const' keyword only holds the address in CALL STACK

const item1 = {
  type: "dairy",
  name: "milk",
  price: 0.99,
};

// Object.assign(target, source);
const itemCopied = Object.assign(
  { created_at: "2024-01-01 12:00+9:00" },
  item1
);
console.log(itemCopied);

item1.price = 1.59;
console.log(item1);
console.log(itemCopied);
