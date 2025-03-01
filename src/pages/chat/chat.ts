import Block from '@core/block';
import template from './chat.hbs?raw';
import { MockChats } from '../../mock-data/chat';
import { ChatList, ChatDialog, ChatHeader } from '@components/index';

export default class Chat extends Block<{}, { currentDialog: string; currentUser: string }> {
  constructor() {
    const initialChat = "chat_1";
    const initialCompanion = Chat.getCompanion(initialChat, "ivanivanov");

    super({}, { 
      currentDialog: initialChat, 
      currentUser: initialCompanion?.login || "Неизвестный"
    });
  }

  protected initChildren() {
    this.childrens.chatlist = new ChatList({
      chats: MockChats,
      onClick: (chatId: string) => this.handleChatClick(chatId),
    });

    this.childrens.chatdialog = new ChatDialog({
      messages: this.getCurrentMessages(),
    });

    this.childrens.chatheader = new ChatHeader({
      avatar_url: this.getCompanion()?.avatar_url || '',
      name: this.state.currentUser,
    });
  }

  private getCurrentMessages() {
    const currentChat = MockChats.find(chat => chat.id === this.state.currentDialog);
    return currentChat ? currentChat.messages : [];
  }

  private static getCompanion(chatId: string, currentUser: string) {
    const currentChat = MockChats.find(chat => chat.id === chatId);
    return currentChat?.participants.find(user => user.login !== currentUser);
  }

  private getCompanion() {
    return Chat.getCompanion(this.state.currentDialog, this.state.currentUser);
  }

  private handleChatClick(chatId: string) {
    const companion = Chat.getCompanion(chatId, this.state.currentUser);
    if (!companion) return;

    this.setState({ 
      currentDialog: chatId, 
      currentUser: companion.login 
    });

    this.childrens.chatdialog.setProps({ messages: this.getCurrentMessages() });
    this.childrens.chatheader.setProps({
      avatar_url: companion.avatar_url || '',
      name: companion.login,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
