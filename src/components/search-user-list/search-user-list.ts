import Block from '@core/block';
import template from './search-user-list.hbs?raw';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { SearchListCell } from './user-list-cell';


interface SearchListProps {
  searchUsers?: UserDTO[]; 
}

class SearchList extends Block<SearchListProps> {
  constructor(props: SearchListProps) {
    super(props);
  }

  protected initChildren(): void {

    const users = window.store.getState().searchUsers
    console.log(users)
    if (users) {
      users.forEach((user) => {
        console.log(user.id)
        this.childrens[`usercell-${user.login}`] = new SearchListCell({
          userId: String(user.id) || null,
          userLogin: user.login,
          onClick: () => {
            console.log(user.id)
            window.store.set({ openedModal: false })
          }
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

const mapStateToProps = (state: any) => ({
  searchUsers: state.searchUsers
});

export default connect(mapStateToProps)(SearchList);
