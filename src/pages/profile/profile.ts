import Block from '@core/block';
import renderDOM from '@core/renderDom';
import template from './profile.hbs?raw';
import { CurrentUserMock } from '../../mock-data/current-user';
import { Avatar } from '@components/index';

export default class Profile extends Block<Record<string, unknown>> {
  
  constructor() {
    super({avatar_url: CurrentUserMock.avatar_url});
    this.state = { login: '', password: '', isFormValid: false };
    
  }

  protected initChildren(): void {
    this.childrens.avatar = new Avatar ({
      src: 'img/avatar_mock.jpg',
      className: 'avatar',
      width: 130
    })
  }

  render() {
    return this.compile(template, { current_user: CurrentUserMock });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new Profile();
  renderDOM('#app', page);
});
