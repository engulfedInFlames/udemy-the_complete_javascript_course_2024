import View from "./View";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class AddRecipeView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded 🎉";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerToggleWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _addHandlerToggleWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
