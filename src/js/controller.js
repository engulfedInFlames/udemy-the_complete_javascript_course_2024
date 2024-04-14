import "core-js/actual/promise";
import "regenerator-runtime/runtime.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import AddRecipeView from "./views/addRecipeView.js";
import addRecipeView from "./views/addRecipeView.js";

const { render } = require("sass");

// https://forkify-api.herokuapp.com/v2

// 3. Display number of pages
// 4. Ingredient validation before submiting
// 5. Get nutrition data (https://spoonacular.com/food-api/docs#Get-Recipe-Nutrition-Widget)

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // Loading
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();

    await model.loadSearchResults(query);
    resultView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  const { recipe, bookmarks } = model.state;
  if (!recipe) return;

  if (!recipe.bookmarked) model.addBookmark(recipe);
  else model.deleteBookmark(recipe.id);

  recipeView.update(recipe);
  bookmarksView.render(bookmarks);
};

const controlBookmarks = function () {
  model.restoreBookmarks();
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    // Not update. Really want to a new bookmark
    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
