import renderDOM from '@core/renderDom';
import * as Pages from './pages';
import Handlebars from 'handlebars';

import '@styles/main.pcss';

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
Handlebars.registerHelper("neq", (a, b) => a !== b);

const pages = {
  signin: [Pages.SignIn],
  signup: [Pages.SignUp],
  chat: [Pages.Chat],
  profile: [Pages.Profile],
  profile_edit: [Pages.ProfileEdit]
};

function navigate(page: string) {
  const route = pages[page as keyof typeof pages];

  if (!route) {
    console.error(`Страница "${page}" не найдена`);
    return;
  }

  const [source, context] = route;

  if (typeof source === 'function') {
    renderDOM('#app', new source());
  } else {
    const container = document.getElementById('app')!;
    const temlpatingFunction = Handlebars.compile(source);
    container.innerHTML = temlpatingFunction(context);
  }
}

function handleRouteChange() {
  const page = window.location.hash.slice(1) || 'signin';
  navigate(page);
}

document.addEventListener('DOMContentLoaded', () => handleRouteChange());
window.addEventListener('hashchange', () => handleRouteChange());
