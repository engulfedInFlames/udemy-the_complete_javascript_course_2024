import View from "./View";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class PaginationView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".pagination");

  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const {
      page,
      results: { length: len },
      resultsPerPage,
    } = this._data;
    const numberOfPages = Math.ceil(len / resultsPerPage);

    if (page === 1 && numberOfPages > 1) {
      return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    if (page === numberOfPages && numberOfPages > 1) {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }

    if (page < numberOfPages) {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    return "";
  }
}

export default new PaginationView();
