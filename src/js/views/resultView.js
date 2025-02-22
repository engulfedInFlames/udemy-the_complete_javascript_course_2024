import View from "./View";
import previewView from "./previewView";
const iconsUrl = new URL("../../img/icons.svg", import.meta.url);

class ResultView extends View {
  // View has access to the parent element
  _parentElement = document.querySelector(".results");
  _data;
  _errorMessage = "No recipes found for your query! Please try again.";

  _generateMarkup() {
    const html = this._data
      .map((result) => previewView.render(result, false))
      .join("");
    return this._sanitizeMarkup(html);
  }
}

export default new ResultView();
