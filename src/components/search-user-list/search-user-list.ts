import Block from '@core/block';
import template from './search-user-list.hbs?raw';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { SearchListCell } from './user-list-cell';
import { CONSTATNS } from '@utils/constants';
import './search-user-list.pcss'
import { addUserToChat } from '../../services/chat';


interface SearchListProps {
  searchUsers?: UserDTO[]; 
}

class SearchList extends Block<SearchListProps> {
  constructor(props: SearchListProps) {
    super(props);
  }

  protected initChildren(): void {

    const users = window.store.getState().searchUsers
    if (users) {
      users.forEach((user) => {
        this.childrens[`usercell-${user.login}`] = new SearchListCell({
          userId: String(user.id) || null,
          userLogin: user.login,
          onClick: () => {
            if (user.id) {
              addUserToChat(user.id)
            }
          },
          avatarUrl: user.avatar !== null ? (CONSTATNS.BASE_SOURCES_URL + user.avatar) : 'img/avatar_mock.jpg'
        });
      });
    }
  }

  protected componentDidUpdate(): boolean {
    this.initChildren()
    return true
  }

  render() {
    console.log('Дети списка', this.childrens)
    return this.compile(template, {});
  }
}

const mapStateToProps = (state: SearchListProps) => ({
  searchUsers: state.searchUsers
});

export default connect(mapStateToProps)(SearchList);
