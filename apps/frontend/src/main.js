import { getHappyViewUrl } from "./api/happyview.js";
import { renderApp } from "./components/App.js";

const mount = document.getElementById("app");

if (mount) {
  renderApp({ mount, happyviewUrl: getHappyViewUrl() });
}
