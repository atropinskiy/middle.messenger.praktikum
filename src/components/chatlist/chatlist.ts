import Block from '@core/block';
import template from './chatlist.hbs?raw';
import { ChatModel } from '@models/chat';
import { ChatRow } from '@components/chatrow';

interface ChatListProps {
  chats: ChatModel[];
  onClick: (_chatId: string) => void;
}

export class ChatList extends Block<ChatListProps> {
  private static readonly currentUser = 'ivanivanov';

  constructor(props: ChatListProps) {
    super(props);
    this.initChildren();
  }

  protected initChildren() {
    this.props.chats.forEach((chat) => {
      console.log(chat)
      const filteredMessages = chat.messages.filter(
        (msg) => msg.from.login !== ChatList.currentUser
      );

      this.childrens[chat.id] = new ChatRow({
        id: chat.id,
        onClick: this.props.onClick,
        messagesCount: filteredMessages.length,
      });
    });
  }

  render() {
    return this.compile(template, {});
  }
}
