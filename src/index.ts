import * as Pages from './pages';
import Handlebars from 'handlebars';
import { Router } from '@core/Router';
import { ROUTER } from '@utils/constants';
import '@styles/main.pcss';

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
Handlebars.registerHelper("neq", (a, b) => a !== b);

const APP_ROOT_ELEMNT = "#app";
window.router = new Router(APP_ROOT_ELEMNT);


window.router
  .use(ROUTER.signin, Pages.SignIn)
  .use(ROUTER.signUp, Pages.SignUp)
  .start();

