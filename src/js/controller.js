import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const timeout = function (s) {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

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

['hashchange', 'load'].forEach((evt) =>
  window.addEventListener(evt, controlRecipes),
);
