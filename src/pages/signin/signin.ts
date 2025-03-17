import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signin.hbs?raw';
import { Button, InputField, Link } from '@components/index';
import { validateLogin, validatePassword } from '@utils/validators';
import { AuthModel } from '@models/auth';
import { Router } from '@core/router/router';
import { Store } from '@core/store/store';

const router = new Router();
const store = new Store({
  login: '',
  password: '',
  isFormValid: false,
  isLogged: true,
});

export default class SignIn extends Block<object, AuthModel> {
  constructor() {
    super();

    // Подписка на изменения состояния хранилища
    store.on('changed', () => {
      // Перерисовываем компонент, когда данные в хранилище изменяются
      this.setProps({
        login: store.getState().login,
        password: store.getState().password,
        isFormValid: store.getState().isFormValid,
      });
    });
  }

  protected initChildren() {
    this.childrens.button = new Button({
      type: 'button',
      name: 'login',
      label: 'Логин',
      className: 'button w-100',
      onClick: () => {
        if (store.getState().isFormValid) {
          console.log('Отправка данных:', store.getState());
          router.go('/chat');
        } else {
          console.log('Форма заполнена неверно');
        }
      },
    });

    this.childrens.input = new InputField({
      placeholder: 'Login',
      name: 'login',
      error: '',
      value: store.getState().login,  // Используем значение из хранилища
      parentClasses: 'signin-login-input',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = validateLogin(input.value);

        this.childrens.input.setProps({ error, value: input.value });

        // Обновляем состояние хранилища
        store.set({
          login: input.value,
          isFormValid: !error && !validatePassword(store.getState().password),
        });
      },
    });

    this.childrens.input_password = new InputField({
      placeholder: 'Password',
      name: 'password',
      value: store.getState().password,  // Используем значение из хранилища
      error: '',
      parentClasses: 'signin-login-input',
      type: 'password',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = validatePassword(input.value);
        this.childrens.input_password.setProps({ error, value: input.value });

        // Обновляем состояние хранилища
        store.set({
          password: input.value,
          isFormValid: !error && !validateLogin(store.getState().login),
        });
      },
    });

    this.childrens.testbtn = new Button({
      label: "тестовая кнопка",
      name: 'test',
      type: 'button',
      onClick: () => {
        store.set({ login: 'popa' });  // Обновляем состояние хранилища
      },
    });

    // Используем значение из хранилища для второй кнопки
    this.childrens.testbtn2 = new Button({
      label: store.getState().login,  // Используем значение из хранилища
      name: 'test',
      type: 'button',
    });

    // Подписываемся на изменения в хранилище и обновляем label для testbtn2
    store.on('changed', () => {
      this.childrens.testbtn2.setProps({
        label: store.getState().login,  // Обновляем label кнопки на основе состояния хранилища
      });
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
