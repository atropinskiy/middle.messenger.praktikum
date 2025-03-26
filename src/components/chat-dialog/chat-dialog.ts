import Block from '@core/block';
import template from './chat-dialog.hbs?raw';
import { Stub } from '@components/index';
import { connect } from '@utils/connect';
import { IChatMessage, UserDTO } from 'api/type';

interface ChatDialogProps {
	currentMessages?: IChatMessage[];
	isLoading?: boolean;
	myUser?: number;
	user?: UserDTO;
}

class ChatDialog extends Block {
	constructor(props: ChatDialogProps) {
		super({ ...props });
	}

	protected initChildren(): void {
		this.childrens.stub = new Stub({
			label: 'Нет сообщений, начните диалог или выберите чат',
		});
	}

	scrollToBottom() {
		setTimeout(() => {
			const messagesContainer = document.querySelector('.inner-message-div');
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		}, 1);
	}

	render() {
		const result = this.compile(template, this.props);
		setTimeout(() => {
			this.scrollToBottom();
		}, 3);
		return result;
	}
}

const mapStateToProps = (state: ChatDialogProps) => {
	return {
		currentMessages: state.currentMessages,
		myUser: state.user ? state.user.id : {},
		isLoading: state.isLoading,
	};
};

export default connect(mapStateToProps)(ChatDialog);
