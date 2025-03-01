import Block from '@core/block';
import template from './chatrow.hbs?raw';
import { Avatar } from '@components/avatar';

interface ChatRowProps {
  id: string;
  onClick?: (chatId: string) => void;
  messagesCount: number;
}

export class ChatRow extends Block {
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
