import Block from '@core/block';
import template from './chat.hbs?raw';
import { MockChats } from '../../mock-data/chat';
import { ChatList, ChatDialog } from '@components/index';
import renderDOM from '@core/renderDom';


export default class Chat extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.childrens.chatlist = new ChatList({
      chats: MockChats
    });
    this.childrens.chatdialog = new ChatDialog({
      messages: MockChats.filter(chat => chat.id === "chat_1")[0].messages
    });
  }

  render() {
    console.log('Rendering Chat component with chats:', MockChats);
    return this.compile(template, { chats: MockChats });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new Chat(); 
  renderDOM('#app', page);
});
