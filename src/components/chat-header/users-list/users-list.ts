import Block from '@core/block';
import { ChatMenuItem } from '../chat-menu-btn/chat-menu-item/chat-menu-item';
import template from './users-list.hbs?raw';
import { connect } from '@utils/connect';
import { TChatUser } from 'api/type';
import { delUserFromChat } from '../../../services/chat';

interface UserListProps {
	currentChatUsers?: TChatUser[];
}

class UserList extends Block<UserListProps> {
	constructor(props: UserListProps) {
		super(props);
	}

	protected initChildren(): void {
		const users = this.props.currentChatUsers;
		const currentUserId = window.store.getState().user?.id;
		if (users) {
			users
				.filter((user) => user.id !== currentUserId)
				.forEach((user) => {
					this.childrens[`us${user.id}`] = new ChatMenuItem({
						icon: 'x',
						label: user.login,
						className: 'mt-2',
						classNameIcon: 'chat-menu-icon-color-red',
						onClick: () => this.handleDelUserClick(user.id),
					});
				});
		}
	}

	private handleDelUserClick = (userId: number | undefined) => {
		if (userId) {
			delUserFromChat(userId);
			console.log('Пользователь удален из чата');
		}
	};

	render() {
		return this.compile(template, {});
	}
}

const mapStateToProps = (state: UserListProps) => ({
	currentChatUsers: state.currentChatUsers,
});

export default connect(mapStateToProps)(UserList);
