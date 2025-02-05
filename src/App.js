import Handlebars from 'handlebars';
import * as Pages from './pages';

import Button from './components/button/index.js';
Handlebars.registerPartial('Button', Button);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'signin',
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'signin') {
      template = Handlebars.compile(Pages.SignIn);
      this.appElement.innerHTML = template({
        button: {
          id: 'loginButton',
          className: 'btn-primary',
          text: 'Войти',
        },
      });
    }
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const button = document.getElementById('loginButton');
    if (button) {
      button.addEventListener('click', () => {
        alert('Кнопка нажата!');
      });
    }
  }
}
