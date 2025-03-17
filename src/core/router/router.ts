type RouterType = {
  start(): void;
  use(path: string, callback: () => void): RouterType;
  go(path: string): void;
  back(): void;
  forward(): void;
};

export class Router implements RouterType {
  private routes: Record<string, () => void> = {};

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      if (target) {
        console.log(`Попытка перехода на: ${target.location.pathname}`);
        this.onRouteChange(target.location.pathname);
      }
    };
    this.onRouteChange(window.location.pathname);
  }
  

  private onRouteChange(pathname: string = window.location.pathname): void {
    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      if (routePath === pathname) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*'](); // Вызов дефолтного маршрута, если путь не найден
    }
  }

  use(pathname: string, callback: () => void): RouterType {
    this.routes[pathname] = callback;
    return this;
  }

  go(pathname: string): void {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  back(): void {
    window.history.back(); // Переход на предыдущую страницу
  }

  forward(): void {
    window.history.forward(); // Переход на следующую страницу
  }
}
