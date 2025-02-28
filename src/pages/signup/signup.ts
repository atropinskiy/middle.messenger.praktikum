import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signup.hbs?raw';
import { Button, Input } from '@components/index'
import { RegisterModel } from '@models/register';
import * as Validators from "@utils/validators"


export default class SignIn extends Block<{}, RegisterModel> {
  constructor() {
    super();
    this.state = { email: "", login: "", first_name: "", password: "", password_confirm: "", phone: "", second_name: "", isFormValid: false };
  }
  protected initChildren() {
    this.childrens.register_button = new Button({
      type: 'button',
      name: "email",
      label: 'Зарегистрироваться',
      className: 'button w-100',
      onClick: () => {
        if (this.state.isFormValid) {
          console.log('Отправка данных:', this.state);
        } else {
          console.log('Форма заполнена неверно');
        }
      }
    });
    this.childrens.email_input = new Input({
      placeholder: 'Email',
      name: 'email',
      autocomplete: 'email',
      className: 'w-100 input__element',
      type: 'text',
      value: '',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = Validators.validateLogin(input.value);
        this.childrens.email_input.setProps({ error, value: input.value });

        this.setState({
          email: input.value,
          isFormValid: !error && !Validators.validatePassword(this.state.password)
        });
        console.log(this.state)
      }
    });
    this.childrens.login_input = new Input({
      placeholder: 'Логин',
      name: 'login',
      autocomplete: 'login',
      className: 'w-100 input__element',
      type: 'text',
      value: '',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        const error = Validators.validateLogin(input.value);
        this.childrens.login_input.setProps({ error, value: input.value });

        this.setState({
          email: input.value,
          isFormValid: !error && !Validators.validatePassword(this.state.password)
        });
      }
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