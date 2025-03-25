import Block from '@core/block';
import template from './search-user-list.hbs?raw';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { CONSTATNS } from '@utils/constants';

interface SearchListProps {
  searchUsers: UserDTO; 
  onClick: (userId: number) => void
}

class SearchList extends Block {
  constructor(props: SearchListProps) {
    super({...props});
    this.setProps({baseAvatarUrl: CONSTATNS.BASE_SOURCES_URL})
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

const mapStateToProps = (state: any) => ({
  searchUsers: state.searchUsers
});

export default connect(mapStateToProps)(SearchList);
