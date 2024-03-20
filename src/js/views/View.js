const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

export default class View {
  _parentElement;
  _data;
  _message;
  _errorMessage;

  render(data) {
    this._clear();

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // The DOM only lives in out memory.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!curEl || newEl.isEqualNode(curEl)) return;

      // Only executed for elements containing text as a direct child node
      const newElText = newEl.firstChild?.nodeValue.trim();
      const curElText = curEl.firstChild?.nodeValue.trim();

      if (newElText && newElText !== curElText) {
        curEl.textContent = newEl.textContent;
      }

      Array.from(newEl.attributes).forEach((attr) => {
        if (curEl.getAttribute(attr.name) !== attr.value) {
          curEl.setAttribute(attr.name, attr.value);
        }
      });
    });
  }

  addHandlerRender(handler) {}

  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${iconsUrl}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _generateMarkup() {
    // This method should be implemented in the child class
    const html = ``;
    return this._sanitizeMarkup(html);
  }

  _sanitizeMarkup(html) {
    return html
      .replace(/<script/gi, "&lt;script")
      .replace(/<\/script>/gi, "&lt;/script&gt;");
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
