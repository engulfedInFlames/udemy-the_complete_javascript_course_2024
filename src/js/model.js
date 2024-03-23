import { API_URL, API_KEY, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

// clearBookmarks();

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { data: recipe } = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
    // Return nothing, just change the state
    state.recipe = { ...refineRecipeData(recipe) };

    if (state.bookmarks.find((b) => b.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const {
      data: { recipes },
    } = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = recipes.map(
      ({ id, title, publisher, image_url, key }) => {
        return {
          id,
          title,
          publisher,
          image: image_url,
          ...(key && { key: key }),
        };
      }
    );
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  // Update the state of the page
  state.search.page = page;

  const { results, resultsPerPage } = state.search;
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  return results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(
      (entry) =>
        typeof entry[0] === "string" &&
        entry[0].startsWith("ingredient") &&
        entry[1] !== ""
    )
    .map((ing) => {
      const ingArr = ing[1].split(",").map((el) => el.trim());
      if (ingArr.length !== 3)
        throw new Error(
          "Wrong ingredient format! Please use the correct format :)"
        );
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  const payload = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  };
  const { data: recipe } = await AJAX(`${API_URL}?key=${API_KEY}`, payload);
  state.recipe = refineRecipeData(recipe);
  addBookmark(state.recipe);
};

export const addBookmark = function (recipe) {
  state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  if (id !== state.recipe.id) return;

  const index = state.bookmarks.findIndex((b) => b.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
  state.recipe.bookmarked = false;
};

export function restoreBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
}

function persistBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

function clearBookmarks() {
  localStorage.clear("bookmarks");
}

function refineRecipeData(recipe) {
  const {
    recipe: {
      id,
      image_url: image,
      ingredients,
      publisher,
      servings,
      source_url: sourceUrl,
      title,
      cooking_time: cookingTime,
      key,
    },
  } = recipe;
  // prettier-ignore
  return { id, image, ingredients, publisher, servings,
    sourceUrl, title, cookingTime, bookmarked:false, ...(key && {key:key}) };
}
