import renderDOM from '@core/renderDom';
import * as Pages from "./pages";
import Handlebars from "handlebars";
import "@styles/main.pcss"

const pages = {
  login: [Pages.SignIn],
};

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  if (typeof source === "function") {
    renderDOM("#app", new source({}));
    return;
  }
  const container = document.getElementById("app")!;
  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));


document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});