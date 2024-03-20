/* 
// Imported scripts are always executed before the main script
// ↓ 'import' statements are always hoisted to the top of the file
import { addToCart, totalPrice as tp, tq } from "./shoppingCart.js";
import * as ShoppingCart from "./shoppingCart.js";
console.log("Importing modules");

ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice);
*/

/* 
// ↓ Do NOT use the export default with named imports
// import add, { addToCart, totalPrice as tp, tq } from "./shoppingCart.js";
*/

// Module do NOT simply import the code from another file, but they also import the STATE of the module. So, mutations to the imported module will affect the original module.
/* 
import add from "./shoppingCart.js";
add("pizza", 2);
*/

///////////////////////////////////////
// Top-level await
// ↓ In the ES6 modules, with the top-level await, we can use the await keyword outside of an async function. (Use it only in necessary situations)
/* 
const res = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await res.json();
console.log(data);
*/

// IIFE with Closures
/* 
// ↓ IIFE: Immediately Invoked Function Expression
// ↓ Closures: A function has access to the variable environment of the execution context in which it was created. Even after that execution context is gone.
// ↓ The IIFE creates a new scope, and the closures are created in that scope.
// ↓ The IIFE is executed immediately, and the closures are preserved.
// ↓ The IIFE is a good way to create data privacy.
// ↓ The IIFE is a good way to avoid polluting the global scope.
// ↓ The IIFE is a good way to avoid naming conflicts.
// ↓ The IIFE is a good way to avoid overwriting variables.
*/

// Common JS Modules & EMD Modules
/* 
// What is Common JS modules?
// ↓ Common JS modules are the modules used in Node.js.
*/

// Parcel
/* 
// parcel is another CLI tool for bundling
// npx parcel index.html <- This command will start a development server and watch the files for changes.
// or create a command in the package.json file

// ↓ This is a special syntax that only parcel can understand.
if (module.hot) {
  module.hot.accept();
}
*/

// core-js
import "core-js/stable";

// Polyfilling async functions
import "regenerator-runtime/runtime";
