import Handlebars from 'handlebars';
import * as Pages from './pages';

import Button from './components/button/index.js';
import Input from './components/input/index.js';
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'signin',
    };
    this.appElement = document.getElementById('app');
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  render() {
    let template;
    if (this.state.currentPage === 'signin') {
      template = Handlebars.compile(Pages.SignIn);
      this.appElement.innerHTML = template({
        button: {
          id: 'loginButton',
          className: '',
          text: 'Войти',
        },
      });
    } else if (this.state.currentPage === 'signup') {
      let template = Handlebars.compile(Pages.SignUp);
      this.appElement.innerHTML = template({
        button: {
          id: 'registerButton',
          className: '',
          text: 'Зарегистрироваться',
        },
      });
    }
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    if (signUpButton) {
      signUpButton.addEventListener('click', () => {
        this.changePage('signup')
      });
    } else if (signInButton) {
      signInButton.addEventListener('click', () => {
        this.changePage('signin')
      });
    }
  }

  handleHashChange() {
    const page = window.location.hash.slice(1) || 'signin'; 
    window.location.hash = 'signup';
    this.changePage(page);
  }

  changePage(page) {
    this.state.currentPage = page;
    window.location.hash = 'signin';
    this.render();
  }
}
