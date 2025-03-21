import Block from '@core/block';
import { ChatMenuBtn } from './chat-menu-btn/chat-menu-btn';
import { ChatMenuItem } from './chat-menu-btn/chat-menu-item/chat-menu-item';
import template from './chat-header.hbs?raw';

interface ChatHeaderProps {
  avatar_url: string;
  name: string;
}

export class ChatHeader extends Block<{ isMenuVisible: boolean } & ChatHeaderProps,{isMenuVisible: boolean}> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      isMenuVisible: false, // Меню скрыто по умолчанию
    });
  }

  protected initChildren(): void { 
    this.childrens.addUser = new ChatMenuItem({
      label: 'Создать пользователя',
      icon: '+',
      onClick: () => console.log("Добавить пользователя"),
    });

    this.childrens.delUser = new ChatMenuItem({
      label: 'Удалить пользователя',
      icon: 'x',
      className: "mt-3",
      onClick: () => console.log("Удалить пользователя"),
    });

    this.childrens.menuBtn = new ChatMenuBtn({
      onClick: () => {
        this.setState((prevState) => ({
          isMenuVisible: !prevState.isMenuVisible,
          
        }));
        console.log(this.state.isMenuVisible)
      },
    });
  }

  render() {
    return this.compile(template, { 
      ...this.props, 
      isMenuVisible: this.state.isMenuVisible, // Передаем в шаблон
    });
  }
}

export default ChatHeader;
