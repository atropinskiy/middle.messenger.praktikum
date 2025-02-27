import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signin.hbs?raw';
import {Button, Input} from '@components/index'


export default class SignIn extends Block {
  constructor() {
    super();
  }
  protected initChildren() {
    this.childrens.button = new Button({
      type: 'button',
      name: "login",
      label: 'Логин',
      className: 'button w-100',
      onClick() {
        console.log(123)
      },
    });
    this.childrens.input = new Input({
      placeholder: 'Login',
      name: 'login',
      autocomplete: 'login',
      className:'w-100 input__element',
      type: 'text',
      onChange: () => {console.log(123)}
    });
    this.childrens.input_password = new Input({
      placeholder: 'Password',
      name: 'password',
      autocomplete: 'password',
      className:'w-100 mt-2',
      type: 'text',
      onChange: () => {console.log(123)}
    })
  }

  render() {
    return this.compile(template, {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new SignIn();
  renderDOM('#app', page);
});