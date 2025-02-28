import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './profile.hbs?raw';
import { CurrentUserMock } from '../../mock-data/current-user';

export default class SignIn extends Block<{}> {
  constructor() {
    super();
    this.state = { login: '', password: '', isFormValid: false };
  }
  
  render() {
    return this.compile(template, { current_user: CurrentUserMock });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new SignIn();
  renderDOM('#app', page);
});