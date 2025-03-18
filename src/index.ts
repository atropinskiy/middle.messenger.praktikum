import * as Pages from './pages';
import Handlebars from 'handlebars';
import { Router } from '@core/Router';
import '@styles/main.pcss';

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
Handlebars.registerHelper("neq", (a, b) => a !== b);

const router = new Router();

// Логирование при добавлении маршрута
console.log('Добавляем маршрут: /signin');
router.use('signin', Pages.SignIn);

document.addEventListener('DOMContentLoaded', () => {
  const initialPage = window.location.pathname.slice(1) || 'signin';
  console.log(`Инициализация с маршрута: ${initialPage}`);

  // Логируем старт роутера
  router.start();
  console.log('Роутер стартовал');

  // Логируем переход на начальную страницу
  router.go(initialPage);
  console.log(`Переход на маршрут: ${initialPage}`);
});
