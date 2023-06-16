import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';

  /**
   * @returns {string}
   * @private
   */
  _generateMarkup() {
    return this._data.map(ResultsView._generateMarkupPreview).join();
  }

  /**
   * @param id {string}
   * @param image {string}
   * @param publisher {string}
   * @param title {string}
   * @returns {string}
   * @private
   */
  static _generateMarkupPreview({ id, image, publisher, title }) {
    const currId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          currId === id && 'preview__link--active'
        }" href="#${id}">
          <figure class="preview__fig">
            <img src="${image}" alt="${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
