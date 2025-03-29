import Block from '@core/block';

import template from './back-div.hbs?raw';

interface BackDivProps {
	onClick?: (e: Event) => void;
}

export class Button extends Block {
	constructor(props: BackDivProps) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export default Button;
