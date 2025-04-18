import * as Pages from './pages';
import { Router } from '@core/Router';
import { ROUTER } from '@utils/constants';
import { Store } from '@core/Store';
import * as authServices from './services/auth';
import '@styles/main.pcss';
import { registerHelpers } from '@utils/register-helpers';

registerHelpers();

window.store = new Store({
	isLoading: false,
	user: null,
	isLogged: null,
	errorLabel: '',
	openedModal: false,
	chats: [],
	currentMessages: [],
	currentChatId: 0,
	currentChatUsers: [],
	searchUsers: [],
	avatar: 'img/avatar_mock.jpg',
	currentChatName: '',
});

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);

(async () => {
	await authServices.me();
	window.router
		.use(ROUTER.signin, Pages.SignIn)
		.use(ROUTER.signUp, Pages.SignUp)
		.use(ROUTER.chat, Pages.Chat, true)
		.use(ROUTER.profile, Pages.Profile, true)
		.use(ROUTER.profileEdit, Pages.ProfileEdit, true)
		.use(ROUTER.passwordChange, Pages.PasswordChange, true)
		.use('/', Pages.SignIn)
		.use('*', Pages.ErrorPage)
		.start();
})();
