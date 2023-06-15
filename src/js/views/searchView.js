class SearchView {
  _parentElement = document.querySelector('.search');

  /**
   * @returns {string}
   */
  getQuery() {
    const query = this._parentElement.firstElementChild.value;
    this._clearInput();
    return query;
  }

  /**
   * @private
   */
  _clearInput() {
    this._parentElement.reset();
  }

  /**
   * @param handler {() => void}
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
