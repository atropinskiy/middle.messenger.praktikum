import Block from "@core/block";
import template from "./error.hbs?raw";

export class ErrorPage extends Block {
  constructor() {
    let error = "500";
    let text = "Ошибка сервера";

    if (window.location.hash.includes("error404")) {
      error = "404";
      text = "Страница не найдена";
    } else if (window.location.hash.includes("error500")) {
      error = "500";
      text = "Ошибка сервера";
    }

    super({ error, text });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
