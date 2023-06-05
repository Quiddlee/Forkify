class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.firstElementChild.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.reset();
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
