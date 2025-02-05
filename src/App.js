import Handlebars from 'handlebars';
import * as Pages from './pages';

import Button from './components/button/index.js';
import Input from './components/input/index.js';
import SearchField from './components/searchfield/index.js';
import ChatRow from './components/chatrow/index.js';
import Avatar from './components/avatar/index.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchField', SearchField);
Handlebars.registerPartial('ChatRow', ChatRow);
Handlebars.registerPartial('Avatar', Avatar);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'signin',
    };
    this.appElement = document.getElementById('app');
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  }

  render() {
    let template;
    if (this.state.currentPage === 'signin') {
      template = Handlebars.compile(Pages.SignIn);
      this.appElement.innerHTML = template({
        button: {
          id: 'signInButton',
          className: '',
          text: 'Войти',
        },
      });
    } else if (this.state.currentPage === 'signup') {
      template = Handlebars.compile(Pages.SignUp);  // Убираем повторное объявление переменной template
      this.appElement.innerHTML = template({
        button: {
          id: 'registerButton',
          className: '',
          text: 'Зарегистрироваться',
        },
      });
    } else if (this.state.currentPage === 'error404') {
      template = Handlebars.compile(Pages.Error);
      this.appElement.innerHTML = template({
        error: {
          number: '404',
          text: 'Не туда попали',
        },
      });
    } else if (this.state.currentPage === 'error500') {
      template = Handlebars.compile(Pages.Error);
      this.appElement.innerHTML = template({
        error: {
          number: '500',
          text: 'Мы уже фиксим',
        },
      });
    } else if (this.state.currentPage === 'chat') {
      template = Handlebars.compile(Pages.Chat);
      this.appElement.innerHTML = template({
        chats: [
          { image: { image_path: "img/avatar_mock.jpg", width: 47 }, name: "Chat 1" },
          { image: { image_path: "img/avatar_mock.jpg", width: 47 }, name: "Chat 2" },
          { image: { image_path: "img/avatar_mock.jpg", width: 47 }, name: "Chat 3" }
        ]
      });
    } else if (this.state.currentPage === 'profile') {
      template = Handlebars.compile(Pages.Profile);
      this.appElement.innerHTML = template({
        image: { image_path: "img/avatar_mock.jpg", width: 130 }

      });
    } else if (this.state.currentPage === 'profile_edit') {
      template = Handlebars.compile(Pages.ProfileEdit);
      this.appElement.innerHTML = template({
        image: { image_path: "img/avatar_mock.jpg", width: 130 },
        button: {
          id: 'profileSaveButton',
          className: 'profile-save-button',
          text: 'Сохранить',
        }
      });
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const signInButton = document.getElementById('signInButton');
    const saveProfileButton = document.getElementById('profileSaveButton');

    if (signInButton) {
      signInButton.addEventListener('click', () => {
        this.changePage('chat');
      });
    }

    if (saveProfileButton) {
      saveProfileButton.addEventListener('click', () => {
        this.changePage('profile');
      });
    }
  }

  handleHashChange() {
    const page = window.location.hash.slice(1) || 'signin';
    if (page === 'error404') {
      this.changePage('error404');
    } else {
      this.changePage(page);
    }
  }

  changePage(page) {
    this.state.currentPage = page;
    window.location.hash = page;
    this.render();
  }
}
