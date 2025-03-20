import Block from '@core/block';
import template from './chat.hbs?raw';
import { MockChats } from '../../mock-data/chat';
import { ChatList, ChatDialog, ChatHeader, MessageInput, Stub, Link } from '@components/index';
import { MessageModel } from '@models/chat';
import { connect } from '@utils/connect';
import { withRouter } from '@utils/withrouter';
import { ROUTER } from '@utils/constants';


interface ChatProps {
  router?: TRouter; // Типизация роутера, если известна, можно уточнить
}

interface ChatState {
  currentDialog: string,
  currentUser: string,
  messages: MessageModel[]
}

class Chat extends Block<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    const initialChat = 'chat_1';
    console.log('adasdsa', props)
    super(
      { ...props },
      {
        currentDialog: initialChat,
        currentUser: 'ivanivanov',
        messages: []
      }
    );
  }

  protected initChildren() {
    this.childrens.chatlist = new ChatList({
      chats: MockChats,
      onClick: (chatId: string) => this.handleChatClick(chatId),
    });

    this.childrens.profileLink = new Link({
      label: "Профиль ->",
      className: "profile-link",
      onClick: (e) => {
        e.preventDefault()
        if (this.props.router) {
          this.props.router.go(ROUTER.profile);
        } else {
          console.error('Router не передан в Chat');
        }
      },

    })

    this.childrens.chatdialog = new ChatDialog({
      messages: this.state.messages,
    });

    this.childrens.chatheader = new ChatHeader({
      avatar_url: this.getCompanion()?.avatar_url || '',
      name: this.state.currentUser,
    });

    this.childrens.messageInput = new MessageInput({
      onSendMessage: (message: string) => this.handleSendMessage(message),
      message: ''
    });

    this.childrens.stub = new Stub({
      label: "Выберите чат"
    })
  }

  private getCurrentMessages() {
    const currentChat = MockChats.find((chat) => chat.id === this.state.currentDialog);
    return currentChat ? currentChat.messages : [];
  }

  private static getCompanion(chatId: string, currentUser: string) {
    const currentChat = MockChats.find((chat) => chat.id === chatId);

    if (!currentChat) return null;

    const companion = currentChat.participants.find(
      (user) => user.login !== currentUser
    );

    console.log("Found companion:", companion);

    return companion;
  }



  private handleSendMessage(message: string) {
    if (!message) return;

    const currentChat = MockChats.find((chat) => chat.id === this.state.currentDialog);
    if (!currentChat) return;

    const companion = Chat.getCompanion(this.state.currentDialog, this.state.currentUser);

    currentChat.messages.push({
      dateTime: new Date(),
      from: { login: this.state.currentUser, avatar_url: '' },
      to: { login: companion?.login || '', avatar_url: '' },
      message: message,
    });

    const updatedMessages = [...currentChat.messages];
    this.setState({ messages: updatedMessages });

    this.childrens.chatdialog.setProps({ messages: updatedMessages });

    console.log("Updated messages:", updatedMessages);
  }




  private getCompanion() {
    return Chat.getCompanion(this.state.currentDialog, this.state.currentUser);
  }

  private handleChatClick(chatId: string) {
    const companion = Chat.getCompanion(chatId, this.state.currentUser);
    console.log(companion)
    if (!companion) return;

    this.setState({
      currentDialog: chatId,
    });

    this.childrens.chatdialog.setProps({ messages: this.getCurrentMessages() });
    this.childrens.chatheader.setProps({
      avatar_url: companion.avatar_url || '',
      name: companion.login,
    });
  }

  render() {
    console.log(this.getCompanion())
    return this.compile(template, {});
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Chat));
