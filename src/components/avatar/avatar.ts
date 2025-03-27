import Block from '@core/block';
import template from './avatar.hbs?raw';
import { connect } from '@utils/connect';
import { CONSTATNS } from '@utils/constants';
interface AvatarProps {
	avatar?: string;
	user_src?: string;
	className?: string;
	width: number;
	label?: string;
	onClick?: (e: Event) => void;
}

class Avatar extends Block {
	constructor(props: AvatarProps) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	protected componentDidUpdate(): boolean {
		return true;
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const mapStateToProps = (state: AvatarProps) => ({
	avatar: state.avatar
		? CONSTATNS.BASE_SOURCES_URL + state.avatar
		: 'img/avatar_mock.jpg',
});

export default connect(mapStateToProps)(Avatar);
