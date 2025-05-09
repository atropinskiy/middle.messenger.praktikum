import Block from '@core/block';
import template from './chatlist.hbs?raw';
import { ChatRow } from '@components/chatrow';
import { connect } from '@utils/connect';
import { IChatItem } from 'api/type';

interface ChatListProps {
	onClick: (_chatId: string) => void;
	chats?: IChatItem[];
}

class ChatList extends Block<ChatListProps> {
	constructor(props: ChatListProps) {
		super(props);
	}

	protected initChildren() {
		this.childrens = {};
		const chats = window.store.getState().chats;
		if (chats) {
			chats.forEach((chat) => {
				this.childrens[chat.id] = new ChatRow({
					id: String(chat.id),
					title: chat.title,
					lastMessage: chat.last_message ? chat.last_message.content : null,
					lastMessageTime: chat.last_message ? chat.last_message.time : null,
					onClick: this.props.onClick,
					messagesCount: chat.unread_count,
					chatAvatar: chat.avatar,
				});
			});
		}
	}

	protected componentDidUpdate(): boolean {
		this.initChildren();
		return true;
	}

	render() {
		console.log('Дети чата', this.childrens);
		return this.compile(template, {});
	}
}

const mapStateToProps = (state: ChatListProps) => {
	return {
		chats: state.chats,
	};
};

export default connect(mapStateToProps)(ChatList);
