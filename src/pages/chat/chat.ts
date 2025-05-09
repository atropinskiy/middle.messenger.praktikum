import Block from '@core/block';
import template from './chat.hbs?raw';
import {
	ChatList,
	ChatDialog,
	ChatHeader,
	MessageInput,
	Stub,
	Link,
	Modal,
	Button,
} from '@components/index';
import { MessageModel } from '@models/chat';
import { connect } from '@utils/connect';
import { withRouter } from '@utils/withrouter';
import { ROUTER } from '@utils/constants';
import { createChat, getChats, getChatUsers } from '../../services/chat';
import { SocketService } from '../../services/chat';

interface ChatState {
	currentDialog: string;
	messages: MessageModel[];
	loginError?: string;
	openedModal?: string;
}

class Chat extends Block<Record<string, string | null>, ChatState> {
	private socketService: SocketService;

	constructor(props: Record<string, string | null>) {
		const initialChat = 'chat_1';
		super(props, {
			currentDialog: initialChat,
			messages: [],
		});
		this.socketService = new SocketService();
	}

	protected initChildren() {
		getChats();
		const chats = this.props.chats;
		this.childrens.chatList = new ChatList({
			onClick: (chatId: string) => this.handleChatClick(chatId),
			chats: chats,
		});

		this.childrens.profileLink = new Link({
			label: 'Профиль ->',
			className: 'profile-link',
			onClick: (e) => {
				e.preventDefault();
				window.router.go(ROUTER.profile);
			},
		});

		this.childrens.chatdialog = new ChatDialog();

		this.childrens.chatheader = new ChatHeader({
			avatar_url: '',
		});

		this.childrens.messageInput = new MessageInput({
			onSendMessage: (message: string) => {
				this.socketService.sendMessage(message);
			},
			message: '',
		});

		this.childrens.stub = new Stub({
			label: 'Выберите чат',
		});

		this.childrens.modal = new Modal({
			content: '123',
			title: 'Создание чата',
			inputSettings: { name: 'input', value: '' },
			placeHolder: 'Название чата',
			onOkClick: (chatName: string) => {
				createChat(chatName);
			},
		});

		this.childrens.createChatBtn = new Button({
			name: 'createChat',
			label: '+',
			type: 'button',
			className: 'create-chat-btn cursor-pointer',
			onClick: () => {
				window.store.set({ openedModal: 'createChat' });
			},
		});
	}

	private handleChatClick(chatId: string) {
		const user: string = String(window.store.getState().user?.id);
		const chats = window.store.getState().chats;
		const chat = chats.find((chat) => chat.id === Number(chatId));
		window.store.set({ currentChatName: chat?.title });
		window.store.set({ currentChatId: Number(chatId) });
		getChatUsers();
		this.socketService.setSocketConnection(user, chatId);
	}

	render() {
		return this.compile(template, { ...this.props }, { ...this.state });
	}
}

const mapStateToProps = (state: ChatState) => ({
	loginError: state.loginError,
	openedModal: state.openedModal,
});

export default withRouter(connect(mapStateToProps)(Chat));
