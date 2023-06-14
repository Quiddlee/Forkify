class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.firstElementChild.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.reset();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
