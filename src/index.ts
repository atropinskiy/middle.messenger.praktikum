import renderDOM from "@core/renderDom";
import { SignIn } from "./pages/signin"; // Подключаем страницу SignIn

const pages: Record<string, typeof SignIn> = {
  signin: SignIn, // Явно указываем доступные страницы
};

function navigate(page: keyof typeof pages) {
  const PageComponent = pages[page];

  if (!PageComponent) {
    console.error(`Страница "${page}" не найдена`);
    return;
  }

  renderDOM(new PageComponent({}));
}

document.addEventListener("DOMContentLoaded", () => navigate("signin"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("data-page");

  if (page && pages[page]) {
    navigate(page as keyof typeof pages);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
