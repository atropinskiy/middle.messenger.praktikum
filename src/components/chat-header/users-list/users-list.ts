import Block from '@core/block';
import { ChatMenuItem } from '../chat-menu-btn/chat-menu-item/chat-menu-item';
import template from './users-list.hbs?raw';
import { connect } from '@utils/connect';
import { TChatUser } from 'api/type';

interface UserListProps {
  currentChatUsers: TChatUser[];
}

class UserList extends Block<UserListProps> {
  constructor(props: UserListProps) {
    super(props);
  }

  protected initChildren(): void {
    const users = this.props.currentChatUsers
    if (users) {
      users.forEach((user) => {
        this.childrens[`us${user.id}`] = new ChatMenuItem({
          icon: 'x',
          label: user.login,
          className: 'mt-2',
          classNameIcon: 'chat-menu-icon-color-red'
        })
      });
    }
  }

  render() {
    return this.compile(template, {});
  }
}

const mapStateToProps = (state: any) => ({
  currentChatUsers: state.currentChatUsers,
});

export default connect(mapStateToProps)(UserList);
