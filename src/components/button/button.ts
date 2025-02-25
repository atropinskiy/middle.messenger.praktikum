import Block from '@core/block';

interface ButtonProps {
	buttonClass?: string;
	textClass?: string;
	text: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
  events?: { click?: () => void };
}
export class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onClick, ...props }: ButtonProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
		<button class="{{buttonClass}}" type={{type}}>
			<div class="{{textClass}}">{{text}}</div>
		</button>
		`;
	}
}