import Block from '@core/block';
import template from './chat.hbs?raw';
import { ChatList, ChatDialog, ChatHeader, MessageInput, Stub, Link, Modal, Button } from '@components/index';
import { MessageModel } from '@models/chat';
import { connect } from '@utils/connect';
import { withRouter } from '@utils/withrouter';
import { ROUTER } from '@utils/constants';
import { createChat, getChats } from '../../services/chat';
import { SocketService } from '../../services/chat';

interface ChatState {
  currentDialog: string,
  currentUser: string,
  messages: MessageModel[],
}

class Chat extends Block<Record<string, any>, ChatState> {
  private socketService: SocketService;
  
  
  constructor(props: Record<string, any>) {
    const initialChat = 'chat_1';
    super(
      props,
      {
        currentDialog: initialChat,
        currentUser: 'ivanivanov',
        messages: [],
      }
    );
    this.socketService = new SocketService()
  }

  

  protected initChildren() {
    
    getChats()
    const chats = this.props.chats
    this.childrens.chatlist = new ChatList({
      onClick: (chatId: string) => this.handleChatClick(chatId),
      chats: chats
    });

    this.childrens.profileLink = new Link({
      label: "Профиль ->",
      className: "profile-link",
      onClick: (e) => {
        e.preventDefault()
        if (this.props.router) {
          this.props.router.go(ROUTER.profile);
        }
      },

    })

    this.childrens.chatdialog = new ChatDialog({
      messages: this.state.messages,
    });

    this.childrens.chatheader = new ChatHeader({
      avatar_url: '',
      name: this.state.currentUser,
    });

    this.childrens.messageInput = new MessageInput({
      onSendMessage: (message: string) => {
        console.log(message)
        this.socketService.sendMessage(message)
      },
      message: ''
    });

    this.childrens.stub = new Stub({
      label: "Выберите чат"
    });

    this.childrens.modal = new Modal({
      content: '123',
      title: 'Создание чата',
      inputSettings: {name:'input', value: ''},
      onOkClick: () => {
        createChat('test2')
      }
    });

    this.childrens.createChatBtn = new Button({
      name: 'createChat',
      label: '+',
      type: 'button',
      className: 'create-chat-btn cursor-pointer',
      onClick: () => {
        this.handleModalPressed()
      }
    })
  }

  private handleModalPressed() {
    window.store.set({ isModalOpen: true })
  }

  private handleChatClick(chatId: string) {
    const user: string = String(window.store.getState().user?.id)
    
    this.socketService.setSocketConnection(user, chatId);

  }




  // private handleSendMessage(message: string) {
  //   if (!message) return;

  //   const currentChat = MockChats.find((chat) => chat.id === this.state.currentDialog);
  //   if (!currentChat) return;

  //   const companion = Chat.getCompanion(this.state.currentDialog, this.state.currentUser);

  //   currentChat.messages.push({
  //     dateTime: new Date(),
  //     from: { login: this.state.currentUser, avatar_url: '' },
  //     to: { login: companion?.login || '', avatar_url: '' },
  //     message: message,
  //   });

  //   const updatedMessages = [...currentChat.messages];
  //   this.setState({ messages: updatedMessages });

  //   this.childrens.chatdialog.setProps({ messages: updatedMessages });

  //   console.log("Updated messages:", updatedMessages);
  // }

  render() {
    return this.compile(template, { ...this.props }, { ...this.state });
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  isModalOpen: state.isModalOpen,
});

export default withRouter(connect(mapStateToProps)(Chat));
