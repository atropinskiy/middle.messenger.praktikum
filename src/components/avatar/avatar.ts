import Block from '@core/block';
import template from './avatar.hbs?raw';
import Handlebars from 'handlebars';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { CONSTATNS } from '@utils/constants';

Handlebars.registerPartial('Avatar', template);
interface AvatarProps {
	avatar?: UserDTO;
	user_src: string;
	className?: string;
	width: number;
	label?: string;
	onClick?: (e: Event) => void;
}

interface AvatarState {
	avatar?: string;
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

	render() {
		console.log('222', this.props);
		return this.compile(template, this.props);
	}
}

const mapStateToProps = (state: AvatarState) => ({
	avatar: CONSTATNS.BASE_SOURCES_URL + state.avatar,
});

export default connect(mapStateToProps)(Avatar);
