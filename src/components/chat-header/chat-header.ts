import Block from '@core/block';
import { ChatMenuBtn } from './chat-menu-btn/chat-menu-btn';
import { ChatMenuItem } from './chat-menu-btn/chat-menu-item/chat-menu-item';
import template from './chat-header.hbs?raw';
import { Modal } from '@components/index';
import { connect } from '@utils/connect';
import UserList from './users-list/users-list'
import { deleteChat, searchUsersByLogin } from '../../services/chat';

interface ChatHeaderProps {
  avatar_url: string;
  name: string;
  openedModal?: 'createChat' | 'addUser' | false
  currentChatId: number
}

class ChatHeader extends Block<{ isMenuVisible: boolean } & ChatHeaderProps, { isMenuVisible: boolean }> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      isMenuVisible: false,
    });
  }

  protected initChildren(): void {

    this.childrens.userList = new UserList({})
    
    this.childrens.addUser = new ChatMenuItem({
      label: 'Добавить пользователя',
      icon: '+',
      onClick: () => {
        window.store.set({ openedModal: 'addUser' })
        this.setState({ isMenuVisible : false })
      },
      classNameIcon: 'chat-menu-icon-color-blue'
    });

    this.childrens.delChat = new ChatMenuItem({
      icon: 'x',
      label: 'Удалить чат',
      classNameIcon: 'chat-menu-icon-color-red',
      className: 'mt-2',
      onClick: () => {
        const chatId = window.store.getState().currentChatId
        console.log('Удаляем чат', chatId)
        deleteChat(chatId)
      },
    })

    this.childrens.updateChatAvatar = new ChatMenuItem({
      icon: '📝',
      label: 'Обновить аватар',
      classNameIcon: 'chat-menu-icon-color-blue',
      className: 'mt-2'
    })

    this.childrens.modalAdd = new Modal({
      content: '123',
      title: 'Добавление пользователя',
      placeHolder: 'Имя пользователя',
      inputSettings: { name: 'input', value: '' },
      onOkClick: (login: string) => {
        searchUsersByLogin(login)
      }
    })

    this.childrens.menuBtn = new ChatMenuBtn({
      onClick: () => {
        this.setState((prevState) => ({
          isMenuVisible: !prevState.isMenuVisible,
        }));
      },
    });
  }

  protected componentDidUpdate(): boolean {
    this.initChildren()
    return true
  }

  render() {
    return this.compile(template, {
      ...this.props,...this.state
    });
  }
}

const mapStateToProps = (state: any) => ({
  openedModal: state.openedModal,
  currentChatUsers: state.currentChatUsers,
  currentChatId: state.currentChatId
});

export default connect(mapStateToProps)(ChatHeader);
