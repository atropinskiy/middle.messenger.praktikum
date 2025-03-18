interface Window {
  router: any; // Или конкретный тип вашего роутера, если он известен
}

interface TRouter {
	start(): void;
	use(path: string, callback: () => void): CoreRouter;
	go(path: string): void;
	back(): void;
	forward(): void;
}

