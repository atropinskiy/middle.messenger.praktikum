import Block from '@core/block';
import template from './error.hbs?raw';
import { withRouter } from '@utils/withrouter';
import { Link } from '@components/link';

class ErrorPage extends Block {
	constructor() {
		const error = '404';
		const text = 'Стриница не найдена';
		super({ error, text });
	}

	protected initChildren() {
		this.childrens.backLink = new Link({
			label: 'Назад',
			onClick(e) {
				e.preventDefault();
				window.router.back();
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export default withRouter(ErrorPage);
