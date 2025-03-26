import Block from '@core/block';
import template from './search-list-cell.hbs?raw';

interface SearchListCellProps {
  userId: string | null;
  userLogin: string
  avatarUrl?: string | null
  onClick: () => void
}

class SearchListCell extends Block<SearchListCellProps> {
  constructor(props: SearchListCellProps) {
    super({...props, events: {click:props.onClick}});
  }

  render() {
    console.log('asdasd', this.props)
    return this.compile(template, this.props);
  }
}

export default SearchListCell;
