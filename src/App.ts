import Handlebars from 'handlebars';
import * as Pages from './pages';
import { PageName, AppState } from './types/index';

import Button from './components/button/index';
import Input from './components/input/index';
import SearchField from './components/searchfield/index';
import ChatRow from './components/chatrow/index';
import Avatar from './components/avatar/index';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchField', SearchField);
Handlebars.registerPartial('ChatRow', ChatRow);
Handlebars.registerPartial('Avatar', Avatar);

export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = { currentPage: 'signin' };
    this.appElement = document.getElementById('app');
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  }

  render() {
    if (!this.appElement) return;

    let template;
    switch (this.state.currentPage) {
      case 'signup':
        template = Handlebars.compile(Pages.SignUp);
        this.appElement.innerHTML = template({ button: { id: 'registerButton', className: '', text: 'Зарегистрироваться' } });
        break;

      case 'error404':
        template = Handlebars.compile(Pages.Error);
        this.appElement.innerHTML = template({ error: { number: '404', text: 'Не туда попали' } });
        break;

      case 'error500':
        template = Handlebars.compile(Pages.Error);
        this.appElement.innerHTML = template({ error: { number: '500', text: 'Мы уже фиксим' } });
        break;

      case 'chat':
        template = Handlebars.compile(Pages.Chat);
        this.appElement.innerHTML = template({
          chats: [
            { image: { image_path: 'img/avatar_mock.jpg', width: 47 }, name: 'Chat 1' },
            { image: { image_path: 'img/avatar_mock.jpg', width: 47 }, name: 'Chat 2' },
            { image: { image_path: 'img/avatar_mock.jpg', width: 47 }, name: 'Chat 3' },
          ],
        });
        break;

      case 'profile':
        template = Handlebars.compile(Pages.Profile);
        this.appElement.innerHTML = template({ image: { image_path: 'img/avatar_mock.jpg', width: 130 } });
        break;

      case 'profile_edit':
        template = Handlebars.compile(Pages.ProfileEdit);
        this.appElement.innerHTML = template({
          image: { image_path: 'img/avatar_mock.jpg', width: 130 },
          button: { id: 'profileSaveButton', className: 'profile-save-button', text: 'Сохранить' },
        });
        break;

      case 'password_change':
        template = Handlebars.compile(Pages.PasswordChange);
        this.appElement.innerHTML = template({
          image: { image_path: 'img/avatar_mock.jpg', width: 130 },
          button: { id: 'profileSaveButton', className: 'profile-save-button', text: 'Сохранить' },
        });
        break;

      default:
        template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template({ button: { id: 'signInButton', className: '', text: 'Войти' } });
        break;
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const signInButton = document.getElementById('signInButton');
    const saveProfileButton = document.getElementById('profileSaveButton');

    signInButton?.addEventListener('click', () => this.changePage('chat'));
    saveProfileButton?.addEventListener('click', () => this.changePage('profile'));
  }

  handleHashChange() {
    const page = (window.location.hash.slice(1) as PageName) || 'signin';
    this.changePage(page);
  }

  changePage(page: PageName) {
    this.state.currentPage = page;
    window.location.hash = page;
    this.render();
  }
}
