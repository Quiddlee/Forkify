import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * @param data {[] | {}}
   * @returns {void}
   */
  render(data) {
    if (View._isDataNotValid(data)) return this.renderError();

    this._data = data;
    this._clear();
    return this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkup(),
    );
  }

  /**
   * @param data {Object[]}
   * @returns {boolean}
   * @private
   */
  static _isDataNotValid(data) {
    return !data || (Array.isArray(data) && data.length === 0);
  }

  /**
   * @private
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = () => {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  /**
   * @param message {string}
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * @param message {string}
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
