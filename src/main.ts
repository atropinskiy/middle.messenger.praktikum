import registerComponent from "./core/registerComponent";
import renderDOM from "./core/renderDom";

// Импортируем компоненты
import { Button } from "./components/";
import { SignIn } from "./pages/";

// Регистрируем компоненты
registerComponent(Button);

// Настраиваем маршрутизацию страниц
const pages: Record<string, any> = {
  signin: SignIn,
};

function navigate(page: string) {
  const PageComponent = pages[page];

  if (PageComponent) {
    renderDOM(new PageComponent({}));
  }
}

document.addEventListener("DOMContentLoaded", () => navigate("signin"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("page");

  if (page) {
    navigate(page);
    e.preventDefault();
  }
});
