import Block from '@core/block';
import template from './profile.hbs?raw';
import { CurrentUserMock } from '../../mock-data/current-user';
import { Avatar, Link } from '@components/index';
import * as authServices from "../../services/auth";
import { withRouter } from '@utils/withrouter';
import { connect } from '@utils/connect';

class Profile extends Block<Record<string, unknown>> {
  constructor() {
    super({avatar_url: CurrentUserMock.avatar_url});
    this.state = { login: '', password: '', isFormValid: false };
    authServices.me()
  }

  protected initChildren(): void {
    this.childrens.avatar = new Avatar ({
      src: 'img/avatar_mock.jpg',
      className: 'avatar',
      width: 130
    })

    this.childrens.logoutLink = new Link({  
      label: 'Выйти',
      onClick(e) {
        e.preventDefault()
        authServices.logOut()
      },
    })
  }

  render() {
    const store = window.store.getState();
    console.log(store)

    const currentUser = store.user || {};  
    const isLoading = store.isLoading;    
    if (isLoading) {
      return this.compile(template, { loading: true });
      
    }
    return this.compile(template, { current_user: currentUser });
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  user: state.user,
  isLoading: state.isLoading,
});

export default withRouter(connect(mapStateToProps)(Profile));
