import Block from '@core/block';
import template from './signin.hbs?raw';
import { Button, InputField, Link } from '@components/index';
import { validateLogin, validatePassword } from '@utils/validators';
import { withRouter } from '@utils/withrouter';
import { ROUTER } from '@utils/constants';
import * as authServices from "../../services/auth";
import { LoginRequestData } from 'api/type';

interface SignInProps {
  router?: TRouter; // Типизация роутера, если известна, можно уточнить
}

const fields: LoginRequestData = {
  login: '',
  password: '',
};

class SignIn extends Block<SignInProps, LoginRequestData> {
  constructor(props: SignInProps) {
    super({ ...props });
    this.state = { ...fields };
  }

  protected initChildren() {
    this.childrens.button = new Button({
      type: 'button',
      name: 'login',
      label: 'Логин',
      className: 'button w-100',
      onClick: () => {
        this.handleSubmit()
      },  
    });

    this.childrens.input = new InputField({
      placeholder: 'Login',
      name: 'login',
      error: '',
      value: '',  // Используем значение из хранилища
      parentClasses: 'signin-login-input',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = validateLogin(input.value);
        this.childrens.input.setProps({ error, value: input.value })
        if (!error) {
          this.state.login = input.value
        }
      },
    }) as InputField;

    this.childrens.input_password = new InputField({
      placeholder: 'Password',
      name: 'password',
      value: '',  // Используем значение из хранилища
      error: '',
      parentClasses: 'signin-login-input',
      type: 'password',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = validatePassword(input.value);
        this.childrens.input_password.setProps({ error, value: input.value })
        if (!error) {
          this.state.password = input.value
        }
      },
    }) as InputField;


    this.childrens.register_link = new Link({
      router: "",
      onClick: (e) => {
        e.preventDefault();
        console.log(1234)
        if (this.props.router) {
          this.props.router.go(ROUTER.signUp);
        } else {
          console.error('Router не передан в SignIn');
        }
      },
      label: 'Зарегистрироваться',
      className: '',
    });
  }

  private handleSubmit() {
    const login = this.state.login; // Получаем значение из инпута логина
    const password = this.state.password; // Получаем значение из инпута пароля

    // Вы можете здесь передавать данные в сервис авторизации
    const userData = { login, password };
    console.log(userData)

    authServices.login(userData)
      .then(() => {
        // Успешная авторизация, редирект
        if (this.props.router) {
          // this.props.router.go(ROUTER.chat);
        }
      })
      .catch((error) => {
        console.error('Ошибка авторизации', error);
        // Обработка ошибок
      });
  }
  
  render() {
    return this.compile(template, {});
  }
}

export default withRouter(SignIn);
