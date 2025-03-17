import renderDOM from '@core/renderDom';
import * as Pages from './pages';
import Handlebars from 'handlebars';
import { Router } from '@core/router/Router';
import '@styles/main.pcss';

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
Handlebars.registerHelper("neq", (a, b) => a !== b);

const router = new Router();
Object.keys(Pages).forEach(pageKey => {
  const PageComponent = Pages[pageKey as keyof typeof Pages];

  console.log(`Регистрируем маршрут: ${pageKey}`);
  router.use(`/${pageKey.toLowerCase()}`, () => {
    console.log(`Рендерим страницу: ${pageKey}`);
    renderDOM('#app', new PageComponent());
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const initialPage = window.location.pathname.slice(1) || 'signin';
  console.log(`Инициализация с маршрута: ${initialPage}`);
  router.start();
  router.go(initialPage);
});
