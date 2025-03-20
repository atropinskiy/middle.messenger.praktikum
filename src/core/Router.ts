import Route from "./Route";
import * as authServices from '../services/auth';

export interface RouteInterface {
  isProtected: boolean
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
}

export class Router {
  private static __instance: Router;
  public routes: RouteInterface[] = [];
  private history: History = window.history;
  private _currentRoute: RouteInterface | null = null;
  private _rootQuery?;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any, isProtected: boolean = false) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery }, isProtected);
    this.routes.push(route);
    // Логирование добавления маршрута
    console.log(`Маршрут добавлен: ${pathname}`, route);

    return this;
  }

  start(): void {
    console.log('Запуск роутера, текущий путь:', window.location.pathname);

    window.onpopstate = () => {
      console.log('onpopstate сработал, новый путь:', window.location.pathname);
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const isUserAuthorized = authServices.loggedIn();
    const route = this.getRoute(pathname);
    console.log('userUuth:', isUserAuthorized)

    if (!route) {
      console.warn(`Маршрут для ${pathname} не найден!`);
      return;
    }

    if (isUserAuthorized && (pathname === "/signin")) {
      console.warn(`Пользователь уже авторизован, перенаправляем на /messenger`);
      this.go("/chat");
      return;
    }

    if (route.isProtected && !isUserAuthorized) {
      console.warn(`Доступ запрещён! Перенаправление на /signin`);
      this.go("/signin");
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      console.log(`Покидаем маршрут ${this._currentRoute}`);
      this._currentRoute.leave();
    }

    console.log(`Рендерим маршрут ${pathname}`);
    this._currentRoute = route;
    route.render();
  }


  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    if (!route) {
      return this.routes.find(route => route.match('*'))
    }
    return route
  }
}

export default Router;
