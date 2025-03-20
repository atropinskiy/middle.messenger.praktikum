import Block from '@core/block';
import template from './profile.hbs?raw';
import { Avatar, Link } from '@components/index';
import * as authServices from "../../services/auth";
import { withRouter } from '@utils/withrouter';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { ROUTER } from '@utils/constants';

interface ProfileState {
  user: UserDTO | null;
  isLoading: boolean;
}

class Profile extends Block<Record<string, unknown>, ProfileState> {
  constructor(props: Record<string, unknown>) {
    const store = window.store.getState();

    super({ ...props, user: store.user, isLoading: store.isLoading });
    this.state = {
      user: store.user,
      isLoading: store.isLoading,
    };
  }

  protected initChildren(): void {
    this.childrens.avatar = new Avatar({
      src: 'img/avatar_mock.jpg',
      className: 'avatar',
      width: 130,
    });

    this.childrens.profileEdit = new Link({
      label: 'Изменить данные',
      onClick(e) {
        e.preventDefault();
        window.router.go(ROUTER.profileEdit)
      },
    });

    this.childrens.logoutLink = new Link({
      label: 'Выйти',
      onClick(e) {
        e.preventDefault();
        console.log(123)
        authServices.logOut();
      },
    });
  }

  render() {
    return this.compile(template, { current_user: this.state.user });
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
});

export default withRouter(connect(mapStateToProps)(Profile));
