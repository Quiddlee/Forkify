import * as model from './model';
import { addHandlerRender, recipeView } from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ResultsView from './views/resultsView';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    ResultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage());
  } catch (e) {
    // Block
  }
};

const init = () => {
  addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
