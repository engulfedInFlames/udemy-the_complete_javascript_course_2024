import View from "./View";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class PreviewView extends View {
  // View has access to the parent element
  _parentElement = "";

  _generateMarkup() {
    const recipeId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === recipeId ? "preview__link--active" : ""
        }"  href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${iconsUrl}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
