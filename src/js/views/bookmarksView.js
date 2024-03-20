import View from "./View";
import previewView from "./previewView";

const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class BookmarksView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it 😃";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    const html = this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
    return this._sanitizeMarkup(html);
  }
}

export default new BookmarksView();
