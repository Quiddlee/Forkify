import * as model from './model';
import { addHandlerRender, recipeView } from './views/recipeView';

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
    // alert(e);
  }
};

const init = () => {
  addHandlerRender(controlRecipes);
};
init();
