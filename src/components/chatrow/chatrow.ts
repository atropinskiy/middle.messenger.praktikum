import Block from '@core/block';
import template from './chatrow.hbs?raw';
import { CONSTATNS } from '@utils/constants';

interface ChatRowProps {
  id: string;
  onClick?: (chatId: string) => void;
  messagesCount: number;
  lastMessage?: string | null;
  title: string; 
  chatAvatar: string;
}

class ChatRow extends Block {
  constructor(props: ChatRowProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick?.(props.id),
      },
      chatAvatar: props.chatAvatar ? CONSTATNS.BASE_SOURCES_URL + props.chatAvatar : 'img/avatar_mock.jpg'
    });
    this.initChildren();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatRow;
