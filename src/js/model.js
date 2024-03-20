import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // Return nothing, just change the state
    state.recipe = { ...refineRecipeData(data) };
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
    sourceUrl, title, cookingTime };
}
