import Block from '@core/block';
import template from './chatlist.hbs?raw';
import { ChatRow } from '@components/chatrow';
import { connect } from '@utils/connect';
import { IChatItem } from 'api/type';

interface ChatListProps {
  onClick: (_chatId: string) => void;
  chats?: IChatItem[];
}

class ChatList extends Block<ChatListProps> {

  constructor(props: ChatListProps) {
    super(props);
  }

  protected initChildren() {
    const { chats } = this.props;

    if (chats) {
      chats.forEach((chat) => {
        this.childrens[chat.id] = new ChatRow({
          id: String(chat.id),
          onClick: this.props.onClick,
          messagesCount: chat.unread_count,
        });
      });
    }
  }

  render() {
    console.log('рендерим чаты', this.props.chats);
    return this.compile(template, { ...this.props });
  }
}

const mapStateToProps = (state: any) => {
  console.log('Состояние в Redux:', state.chats);  // Проверьте, что chats существует
  return {
    chats: state.chats
  };
};


export default connect(mapStateToProps)(ChatList);
