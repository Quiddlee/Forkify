import icons from '../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * @param handler {(number) => void}
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * @param currPage {number}
   * @returns {string}
   * @private
   */
  static _generateBtnNextMarkup(currPage) {
    return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  /**
   * @param currPage {number}
   * @returns {string}
   * @private
   */
  static _generateBtnPrevMarkup(currPage) {
    return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
    `;
  }

  /**
   * @returns {string}
   * @private
   */
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );
    const currPage = this._data.page;

    // page 1, and there are other pages
    if (currPage === 1) {
      return PaginationView._generateBtnNextMarkup(currPage);
    }

    // other page
    if (currPage < numPages) {
      return (
        PaginationView._generateBtnPrevMarkup(currPage) +
        PaginationView._generateBtnNextMarkup(currPage)
      );
    }

    // last page
    if (currPage === numPages) {
      return PaginationView._generateBtnPrevMarkup(currPage);
    }

    // page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
