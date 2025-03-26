import Block from '@core/block';

import template from './chat-menu-btn.hbs?raw';

interface ChatMenuBtnProps {
	onClick?: (e: Event) => void;
}

export class ChatMenuBtn extends Block {
	constructor(props: ChatMenuBtnProps) {
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

export default ChatMenuBtn;
