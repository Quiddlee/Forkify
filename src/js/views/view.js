import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * @param data {[] | {}}
   * @param render {boolean}
   */
  render(data, render = true) {
    if (View._isDataNotValid(data)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    return this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * @param data {Object[]}
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const virtualDom = document
      .createRange()
      .createContextualFragment(newMarkup);
    const newElements = virtualDom.querySelectorAll('*');
    const currElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      if (newEl.isEqualNode(currEl)) return;

      // updates changed text
      if (newEl.firstChild?.nodeValue.trim() !== '') {
        currEl.textContent = newEl.textContent;
      }

      // updates changed attributes
      [...newEl.attributes].forEach((attr) =>
        currEl.setAttribute(attr.name, attr.value),
      );
    });
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
