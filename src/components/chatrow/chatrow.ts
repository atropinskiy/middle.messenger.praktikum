import Block from '@core/block';
import template from './chatrow.hbs?raw';
import { Avatar } from '@components/avatar';
import { ILastMessage } from 'api/type';
interface ChatRowProps {
  id: string;
  onClick?: (chatId: string) => void;
  messagesCount: number;
  lastMessage?: ILastMessage;
  title: string; 
}

class ChatRow extends Block {
  constructor(props: ChatRowProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick?.(props.id),
      },
    });
    this.initChildren();
  }
  

  protected initChildren() {
    this.childrens.avatar = new Avatar({
      src: 'img/avatar_mock.jpg',
      className: 'avatar',
      width: 47,
      label: '123',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatRow;
