import Block from '@core/block';
import template from './chatlist.hbs?raw';
import { Input } from '@components/index';

interface ChatListProps {
  name: string;
  input: Input;
  onChange?: () => void
}

export class ChatList extends Block<ChatListProps> {

  constructor(props: ChatListProps) {
    super(props);
    this.initChildren();
  }

  protected initChildren() {
      this.childrens.input = new Input({
        name: this.props.name
      });
      
  }

  render() {
    return this.compile(template, {});
  }
}
