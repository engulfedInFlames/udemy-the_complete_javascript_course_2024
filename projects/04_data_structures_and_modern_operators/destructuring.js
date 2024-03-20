"use strict";

// ---- ---- Destructuring ---- ----
// Destructuring is also applyed to the nested data structure.
/*
const foo = [1, 2, 3, 4, 5];
const [num1, num2, ...num3] = foo;
console.log(num1, num2, num3);
*/

/*
const job = {
  name: "Raw-code Engineer",
  location: "Osaka-si Chuo-ku Minamisenba",
  categories: ["PHP", "JS", "Spiral"],
  salary: "$50000",
};

let [firstCategory, secondCategory] = job.categories;
console.log(firstCategory, secondCategory);

// Get third value
let [mainCategory, , tertiaryCategory] = job.categories;
// Swap
[mainCategory, tertiaryCategory] = [tertiaryCategory, mainCategory];
console.log(mainCategory, tertiaryCategory);

// Default values
let [
  category1 = "Category doesn't exist",
  category2 = "Category doesn't exist",
  category3 = "Category doesn't exist",
  category4 = "Category doesn't exist",
] = job.categories;

console.log(category1, category2, category3, category4);
*/

/*
// Mutating variables
let a = 15;
let b = 30;
const obj = { a: 20, b: 40, c: 60, d: { e: 80, f: 100 } };

// {a, b} = obj; ❌ JS understand the parathesis as a code block
({ a, b } = obj);

console.log(a, b);
*/

/*
const job = {
  name: "Raw-code Engineer",
  location: "Osaka-si Chuo-ku Minamisenba",
  categories: ["PHP", "JS", "Spiral"],
  salary: "$50000",
  showWorkHour: ({ start = "09:00", end = "18:00", reason = "" } = {}) => {
    const message =
      (reason ? `Becasue of ${reason}, the work hour ` : "The work hour ") +
      `is from ${start} to ${end}`;
    console.log(message);
  },
};

const {
  name: jobName,
  location: jobLocation,
  salary: jobSalary,
  benefits = [],
} = job;

console.log(jobName, jobLocation, jobSalary, benefits);

const workhour = {
  start: "08:00",
  end: "17:00",
  reason: "summertime",
};

job.showWorkHour(workhour);
job.showWorkHour();
*/

// ---- ---- The Spread Opeartor (...) ---- ----
// Iterables: arrays, strings, maps, sets. ❌ objects

/*
const emotions = ["happy", "enthusiastic", "delighted", "satisfied"];
const newEmotions1 = ["terrified", ...emotions];
const newEmotions2 = [...emotions, "terrified"];

console.log(newEmotions1);
console.log(newEmotions2);
*/

/*
const food = {
  name: "Fettuccine Alfredo",
  ingredients: [
    "extra-virgin olive oil",
    "pasta water",
    "pasta",
    "Cauliflower",
    "Dijon mustard",
    "lemon juice",
    "garlic",
    "Parmesan cheese",
    "butter",
  ],
  time: "45 minutes",
};

const supplementIngredients = [
  prompt("What other ingredients do you need?\n Ingredient 1: "),
  prompt("Ingredient 2: "),
  prompt("Ingredient 3: "),
];

food.ingredients = [...food.ingredients, ...supplementIngredients];
console.log(food);
*/

// ---- ---- Rest Pattern and Parameters

/*
const [num1, num2, ...otherNums] = [1,2,3,4,5];
console.log(num1, num2, otherNums);

// Only the one REST is allowed
// const [num1, num2, ...otherNums1, ...otherNum2] = [1,2,3,4,5]; ❌
// console.log(num1, num2, otherNums1, otherNum2); ❌
*/

/*
const initialValue = 0;
const getSum = (...nums) => {
  // `Array.prototype.reduce`は配列の要素を一つの結果にまとめたい時使う
  return nums.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, initialValue);
};

console.log(getSum(1, 2, 3, 4, 5));
console.log(getSum(2, 4, 6, 8, 10));
console.log(getSum(3, 6, 9, 12, 15));

const nums = [10, 20, 30, 40, 50];
console.log(getSum(...nums));
*/
