import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signin.hbs?raw';
import { Button, InputField, Link } from '@components/index';
import { validateLogin, validatePassword } from '@utils/validators';
import { AuthModel } from '@models/auth';

export default class SignIn extends Block<object, AuthModel> {
  constructor() {
    super();
    this.state = { login: '', password: '', isFormValid: false };
  }
  protected initChildren() {
    this.childrens.button = new Button({
      type: 'button',
      name: 'login',
      label: 'Логин',
      className: 'button w-100',
      onClick: () => {
        if (this.state.isFormValid) {
          console.log('Отправка данных:', this.state);
          window.location.href = '/#chat';
        } else {
          console.log('Форма заполнена неверно');
        }
      },
    });
    this.childrens.input = new InputField({
      placeholder: 'Login',
      name: 'login',
      error: '',
      value: '',
      parentClasses: 'signin-login-input',
      onChange: (e) => {
        
        const input = e.target as HTMLInputElement;
        const error = validateLogin(input.value);

        this.childrens.input.setProps({ error, value: input.value });

        this.setState({
          login: input.value,
          isFormValid: !error && !validatePassword(this.state.password),
        });
      },
    });
    this.childrens.input_password = new InputField({
      placeholder: 'Password',
      name: 'password',
      value: '',
      error: '',
      parentClasses: 'signin-login-input',
      type: 'password',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = validatePassword(input.value);
        this.childrens.input_password.setProps({ error, value: input.value });
        this.setState({
          password: input.value,
          isFormValid: !error && !validateLogin(this.state.login),
        });
      },
    });
    this.childrens.register_link = new Link({
      href: '#signup',
      label: 'Зарегистрироваться',
      className: '',
    });
  }

  render() {
    
    return this.compile(template, {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new SignIn();
  renderDOM('#app', page);
});
