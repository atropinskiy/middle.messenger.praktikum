import Block from '@core/block';
import template from './chatlist.hbs?raw';
import { ChatModel } from '@models/chat';
import { ChatRow } from '@components/chatrow';

interface ChatListProps {
  chats: ChatModel[];
}


export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super(props);
    this.initChildren();
  }
    protected initChildren() {
      this.props.chats.forEach((chat) => {
        this.childrens[chat.id] = new ChatRow({
          id: chat.id, // Передаем id чата в пропсы
          onClick: () => {
            console.log(`Chat ${chat.id} clicked!`);
          }
        });
      });
      
    };

    render() {
      return this.compile(template, {
      });
      
    }
}
