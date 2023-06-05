import * as model from './model';
import { addHandlerRender, recipeView } from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (e) {
    // Block
  }
};

const init = () => {
  addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
