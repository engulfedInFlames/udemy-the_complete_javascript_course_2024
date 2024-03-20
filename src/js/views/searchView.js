import View from "./View";

class SearchView extends View {
  _parentElement = document.querySelector("form.search");

  getQuery() {
    const { value } = this._parentElement.querySelector(".search__field");
    this.#clearInput();

    return value;
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
