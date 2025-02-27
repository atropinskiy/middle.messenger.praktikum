import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signup.hbs?raw';
import {Button, Input} from '@components/index'


export default class SignUp extends Block {
  constructor() {
    super();
  }
  protected initChildren() {
    this.childrens.button = new Button({
      type: 'button',
      name: "login",
      label: 'Логин111111',
      className: 'button w-100',
      onClick() {
        console.log(123)
      },
    });
    this.childrens.input = new Input({
      placeholder: 'Loginфываыва',
      name: 'login',
      autocomplete: 'login',
      className:'w-100',
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
  const page = new SignUp();
  renderDOM('#app', page);
});