import * as model from './model';
import { addHandlerRender, recipeView } from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons
    paginationView.render(model.state.searchs);
  } catch (e) {
    // Block
  }
};

/**
 * @param goToPage {number}
 */
const controlPagination = (goToPage) => {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

/**
 * @param newServings {number}
 */
const controlServings = (newServings) => {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = () => {
  addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
