import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './signin.hbs?raw';

export default class SignIn extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new SignIn();
  renderDOM('#app', page);
});