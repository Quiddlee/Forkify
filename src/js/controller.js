import * as model from './model';
import { addHandlerRender, recipeView } from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView, { BookmarksView } from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
import { state } from './model';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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
    paginationView.render(model.state.search);
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
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // 1) add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => bookmarksView.render(model.state.bookmarks);

const createControlAddRecipe = async (newRecipe) => {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload new recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(state.bookmarks);

    // Change if in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    addRecipeView.renderError(e.message);
  }
};

const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(createControlAddRecipe);
};
init();
