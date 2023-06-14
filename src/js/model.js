import { API_URL, RES_PER_PAGE } from './config';
import getJSON from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

/**
 *
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
};

export const loadSearchResults = async (query) => {
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
