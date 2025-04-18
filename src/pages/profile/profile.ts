import Block from '@core/block';
import template from './profile.hbs?raw';
import { Avatar, Link, BackDiv } from '@components/index';
import * as authServices from '../../services/auth';
import { withRouter } from '@utils/withrouter';
import { connect } from '@utils/connect';
import { UserDTO } from 'api/type';
import { ROUTER } from '@utils/constants';
import { CONSTATNS } from '@utils/constants';

interface ProfileState {
	user?: UserDTO | null;
	isLoading: boolean;
	loginError?: string;
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
		const user = window.store.getState().user;
		const avatarUrl =
			user?.avatar !== null
				? CONSTATNS.BASE_SOURCES_URL + user?.avatar
				: 'img/avatar_mocj.jpg';
		console.log('avatar', avatarUrl);
		this.childrens.backDiv = new BackDiv({
			onClick: () => {
				window.router.back();
			},
		});

		this.childrens.avatar = new Avatar({
			avatar: avatarUrl,
			className: 'avatar',
			width: 130,
		});

		this.childrens.changePassword = new Link({
			label: 'Изменить пароль',
			onClick(e) {
				e.preventDefault();
				window.router.go(ROUTER.passwordChange);
			},
		});

		this.childrens.profileEdit = new Link({
			label: 'Изменить данные',
			onClick(e) {
				e.preventDefault();
				window.router.go(ROUTER.profileEdit);
			},
		});

		this.childrens.logoutLink = new Link({
			label: 'Выйти',
			onClick(e) {
				e.preventDefault();
				console.log(123);
				authServices.logOut();
			},
		});
	}

	render() {
		console.log(this.props.user);
		return this.compile(template, { ...this.props });
	}
}

const mapStateToProps = (state: ProfileState) => ({
	loginError: state.loginError,
	user: state.user,
	avatar: state.user?.avatar,
});

export default withRouter(connect(mapStateToProps)(Profile));
