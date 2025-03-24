import Block from '@core/block';
import { ChatMenuBtn } from './chat-menu-btn/chat-menu-btn';
import { ChatMenuItem } from './chat-menu-btn/chat-menu-item/chat-menu-item';
import template from './chat-header.hbs?raw';
import { Modal } from '@components/index';
import { connect } from '@utils/connect';

interface ChatHeaderProps {
  avatar_url: string;
  name: string;
  openedModal?: 'createChat' | 'addUser' | false
}

class ChatHeader extends Block<{ isMenuVisible: boolean } & ChatHeaderProps, { isMenuVisible: boolean }> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      isMenuVisible: false, // Меню скрыто по умолчанию
    });
  }

  protected initChildren(): void {
    this.childrens.addUser = new ChatMenuItem({
      label: 'Добавить пользователя',
      icon: '+',
      onClick: () => window.store.set({ openedModal: 'addUser' }),
    });

    this.childrens.delUser = new ChatMenuItem({
      label: 'Удалить пользователя',
      icon: 'x',
      className: "mt-3",
      onClick: () => console.log("Удалить пользователя"),
    });

    this.childrens.modalAdd = new Modal({
      content: '123',
      title: 'Добавление пользователя',
      inputSettings: { name: 'input', value: '' },
      onOkClick: () => {
        console.log(123)
      }
    })

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
      ...this.props,...this.state
    });
  }
}

const mapStateToProps = (state: any) => ({
  openedModal: state.openedModal,
});

export default connect(mapStateToProps)(ChatHeader);
