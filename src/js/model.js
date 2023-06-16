import { API_URL, DEFAULT_PAGE, RES_PER_PAGE } from './config';
import getJSON from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: DEFAULT_PAGE,
  },
  bookmarks: [],
};

/**
 * @param id {string}
 * @returns {Promise<void>}
 */
export const loadRecipe = async (id) => {
  const data = await getJSON(`${API_URL}${id}`);

  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };

  if (state.bookmarks.some(({ id: bookmarkId }) => bookmarkId === id)) {
    state.recipe.bookmarked = true;
  } else {
    state.recipe.bookmarked = false;
  }
};

/**
 * @param query
 * @returns {Promise<void>}
 */
export const loadSearchResults = async (query) => {
  state.search.page = DEFAULT_PAGE;
  state.search.query = query;

  const {
    data: { recipes },
  } = await getJSON(`${API_URL}?search=${query}`);

  state.search.results = recipes.map((rec) => ({
    id: rec.id,
    title: rec.title,
    publisher: rec.publisher,
    image: rec.image_url,
  }));
};

/**
 * @param page {number}
 * @returns {Object[]}
 */
export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

/**
 * @param newServings {number}
 */
export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    const ingredient = ing;
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

/**
 * @param recipe {Object}
 */
export const addBookmark = (recipe) => {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

/**
 * @param toDeleteId {string}
 */
export const deleteBookmark = (toDeleteId) => {
  // delete bookmark
  const index = state.bookmarks.findIndex(
    ({ id: bookmarkId }) => bookmarkId === toDeleteId,
  );
  state.bookmarks.splice(index, 1);

  // mark current recipe as not bookmarked
  if (toDeleteId === state.recipe.id) state.recipe.bookmarked = false;
};
