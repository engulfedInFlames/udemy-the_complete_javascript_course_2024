import "core-js/actual/promise";
import "regenerator-runtime/runtime.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const { render } = require("sass");

// https://forkify-api.herokuapp.com/v2
// To fix
// 1. Recipe Ingredients
// 2.

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
  const { recipe } = model.state;

  if (!recipe.bookmarked) model.addBookmark(recipe);
  else model.deleteBookmark(recipe.id);

  recipeView.update(recipe);

  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
};

init();
