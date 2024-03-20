// ---- ---- Short Circuiting Operators (|| and &&)
// In JavaScript short-circuiting, an expression is evaluated from left to right
// until it is confirmed that the result of the remaining conditions is not going to affect the already evaluated result.
// If the result is clear even before the complete evaluation of the expression, it short circuits and the result will be returned.
// Short circuit evaluation avoids unnecessary work and leads to efficient processing.

/*
console.log("" || "Hello Javascript!");
console.log(0 || "Hello Javascript!");
console.log(false || "Hello Javascript!");
console.log(undefined || "Hello Javascript!");
console.log(null || "Hello Javascript!");
console.log("---- ---- ---- ----");

console.log("Hello Javascript!" || "");
console.log("Hello Javascript!" || 0);
console.log("Hello Javascript!" || false);
console.log("Hello Javascript!" || undefined);
console.log("Hello Javascript!" || null);
*/

// The AND operator (&&) returns the first falsy value it encounters or the last value if all are truthy.
// It essentially "continues" as long as it encounters truthy values and returns the first falsy value found or
// the last truthy value if no falsy value is encountered.

/*
console.log("Hello Javascript!" && "");
console.log("Hello Javascript!" && 0);
console.log("Hello Javascript!" && false);
console.log("Hello Javascript!" && undefined);
console.log("Hello Javascript!" && null);
console.log("---- ---- ---- ----");

console.log("" && "Hello Javascript!");
console.log(0 && "Hello Javascript!");
console.log(false && "Hello Javascript!");
console.log(undefined && "Hello Javascript!");
console.log(null && "Hello Javascript!");
*/

// ---- ---- Nullish Coalescing Operator (??) ---- ----
/*
console.log("Hello Javascript!" ?? "");
console.log("Hello Javascript!" ?? 0);
console.log("Hello Javascript!" ?? false);
console.log("Hello Javascript!" ?? undefined);
console.log("Hello Javascript!" ?? null);
console.log("" ?? "Hello Javascript!");
console.log(0 ?? "Hello Javascript!");
console.log(false ?? "Hello Javascript!");
console.log("---- ---- ---- ----");

console.log(undefined ?? "Hello Javascript!");
console.log(null ?? "Hello Javascript!");
*/

// ---- ---- Logical Assignment Operators ---- ----
/*
let [num1, num2] = [0, 1];
let [str1, str2] = ["", "Hello World!"];

num1 ||= 100;
num2 ||= 100;
str1 ||= "Goodbye World!";
str2 ||= "Goodbye World!";

console.log(num1, num2, str1, str2);
console.log("---- ---- ---- ----");

[num1, num2] = [0, 1];
[str1, str2] = ["", "Hello World!"];

num1 &&= 100;
num2 &&= 100;
str1 &&= "Goodbye World!";
str2 &&= "Goodbye World!";

console.log(num1, num2, str1, str2);
console.log("---- ---- ---- ----");

[num1, num2] = [0, 1];
[str1, str2] = ["", "Hello World!"];

num1 ??= 100;
num2 ??= 100;
str1 ??= "Goodbye World!";
str2 ??= "Goodbye World!";

console.log(num1, num2, str1, str2);
console.log("---- ---- ---- ----");
*/

// ---- ---- Object Iteration ---- ----
/* 
const menu = ["pizza", "chiken", "hamburger", "sandwich", "coke"];
const restaurant = {
  name: "Rodie's Restaurant",
  menu: menu,
  categories: ["vegan", "halla", "italian", "instant"],
};

for (const [index, item] of menu.entries()) {
  console.log(index + " : " + item);
}
*/

// ---- ---- Enhanced Object Literals ---- ----
/*
const weekdays = ["Mon", "Tue", "Wed", "Thr", "Fri"];
const menu = ["pizza", "chiken", "hamburger", "sandwich", "coke"];
const restaurant = {
  name: "Rodie's Restaurant",
  [weekdays[2]]: "On Sale",
  menu,
  categories: ["vegan", "hallal", "italian", "instant"],
  order(food) {
    return this.menu.includes(food) ? "$15" : "$0";
  },
};

console.log(restaurant);
console.log(restaurant.order("pizza"));
console.log(restaurant.order("baked feta pasta"));
*/

// ---- ---- Optional Chaining ---- ----
const restaurant = {
  name: "Rodie's Restaurant",
  categories: ["vegan", "hallal", "italian", "instant"],
};

console.log(restaurant.categories[1]);
console.log(restaurant.categories[1].price);
console.log(restaurant.categories[1]?.price);
console.log(restaurant.categories[1]?.price || "Price property doesn't exists");
console.log("---- ---- ---- ----");

// Method
console.log(restaurant.order?.(0, 1));
