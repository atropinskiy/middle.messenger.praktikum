import Router from '@core/Router';
import { Store } from '@core/Store';

declare global {
	interface TRouter {
		start(): void;
		use(path: string, callback: () => void): TRouter;
		go(path: string): void;
		back(): void;
		forward(): void;
	}

	interface Window {
		store: Store;
		router: Router;
	}
}

export {};
