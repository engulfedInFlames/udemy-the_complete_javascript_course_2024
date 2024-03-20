import View from "./View";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class ResultView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".results");
  _data;
  _errorMessage = "No recipes found for your query! Please try again.";

  _generateMarkup() {
    const html = this._data.map(this._generateMarkupPreview).join("");
    return this._sanitizeMarkup(html);
  }

  _generateMarkupPreview({ id, image, title, publisher }) {
    const recipeId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          id === recipeId ? "preview__link--active" : ""
        }"  href="#${id}">
          <figure class="preview__fig">
            <img src="${image}" alt="${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
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

export default new ResultView();
