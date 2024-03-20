import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

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
    const data = await getJSON(`${API_URL}/${id}`);

    // Return nothing, just change the state
    state.recipe = { ...refineRecipeData(data) };

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
    } = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = recipes.map(
      ({ id, title, publisher, image_url }) => {
        return {
          id,
          title,
          publisher,
          image: image_url,
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

function refineRecipeData(data) {
  const {
    data: {
      recipe: {
        id,
        image_url: image,
        ingredients,
        publisher,
        servings,
        source_url: sourceUrl,
        title,
        cooking_time: cookingTime,
      },
    },
  } = data;
  // prettier-ignore
  return { id, image, ingredients, publisher, servings,
    sourceUrl, title, cookingTime, bookmarked:false };
}
