import View from "./View";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class RecipeView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".recipe");
  _data;
  _message = "";
  _errorMessage = "We could not find that recipe. Please try another one!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;

      const { servings } = btn.dataset;
      if (+servings > 0) handler(+servings);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // Event delegation
      // Find the exact element that was clicked
      // Find out whether the clicked element is renedered or not
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    // prettier-ignore
    const { image, title, cookingTime, servings, publisher, sourceUrl, ingredients,
    } = this._data;
    const html = `
    <figure class="recipe__fig">
      <img src="${image}" alt="${title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${title}</span>
      </h1>
    </figure>
    
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${iconsUrl}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${iconsUrl}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${servings}</span>
        <span class="recipe__info-text">servings</span>
    
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-servings="${
            servings - 1
          }">
            <svg>
              <use href="${iconsUrl}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-servings="${
            servings + 1
          }">
            <svg>
              <use href="${iconsUrl}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
    
      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${iconsUrl}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${iconsUrl}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>
    
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${ingredients.map(this._generateMarkupIngredient).join("")}
      </ul>
    </div>
    
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${iconsUrl}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
    return this._sanitizeMarkup(html);
  }

  _generateMarkupIngredient({ quantity, unit, description = "" }) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${iconsUrl}#icon-check"></use>
        </svg>
        ${quantity ? `<div class='recipe__quantity'>${quantity}</div>` : ""}
        <div class="recipe__description">
        ${unit ? `<span class="recipe__unit">${unit}</span>` : ""} ${
      description
        ? description.charAt(0).toUpperCase() + description.slice(1)
        : ""
    }
        </div>
      </li>`;
  }
}

export default new RecipeView();
