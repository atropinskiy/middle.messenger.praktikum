/* eslint-disable */
import { RouteInterface } from './Router';

class Route implements RouteInterface {
	private pathname: string;
	private blockClass: any;
	private block: any;
	private props: any;
	public isProtected: boolean;

	constructor(
		pathname: string,
		view: any,
		props: any,
		isProtected: boolean = false
	) {
		this.pathname = pathname;
		this.blockClass = view;
		this.block = null;
		this.props = props;
		this.isProtected = isProtected;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		} else {
		}
	}

	leave() {
		if (this.block) {
			this.block.hide();
		}
	}

	match(pathname: string) {
		const isMatch = pathname === this.pathname;
		console.log(
			`Проверка совпадения пути: ${pathname} с ${this.pathname} — ${
				isMatch ? 'Совпадает' : 'Не совпадает'
			}`
		);
		return isMatch;
	}

	render() {
		if (!this.block) {
			this.block = new this.blockClass(this.props);
		}

		const root = document.querySelector(this.props.rootQuery);
		if (root) {
			root.innerHTML = ''; // Очищаем контейнер перед рендером
			root.appendChild(this.block.getContent() as HTMLElement);
			this.block.show();
		} else {
		}
	}
}

export default Route;
