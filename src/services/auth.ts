import { ROUTER } from '../utils/constants';
import AuthApi from '../api/auth';
import ProfileApi from '../api/profile';
import { LoginRequestData, APIError, CreateUser, UserDTO } from 'api/type';
import { getChats } from './chat';

const authApi = new AuthApi();
const profileApi = new ProfileApi();

export const loggedIn = () => {
	const store = window.store.getState();
	console.log("Текущее состояние авторизации:", store.isLogged);
	return store.isLogged || null;
};

export const login = async (model: LoginRequestData): Promise<void | APIError> => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		window.store.set({ isLogged: true });
		await me();
	} catch (responsError: unknown) {
		if (responsError instanceof XMLHttpRequest) {
			try {
				const errorData = JSON.parse(responsError.responseText);
				if (errorData.reason === "User already in system") {
					window.router.go(ROUTER.chat);
					console.log('Юзер в системе, перенаправляем в чат');
				} else {
					window.store.set({ errorLabel: errorData.reason });
				}
			} catch {
				console.log('ОШИБКА:', responsError);
			}
		} else {
			console.log('Неизвестная ошибка:', responsError);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const create = async (model: CreateUser): Promise<void | APIError> => {
	window.store.set({ isLoading: true });
	try {
		await authApi.create(model);
		window.store.set({ isLogged: true });
		await me();
		window.router.go(ROUTER.chat);
	} catch (responsError: unknown) {
		if (responsError instanceof XMLHttpRequest) {
			try {
				const errorData = JSON.parse(responsError.responseText);
				window.store.set({ errorLabel: errorData.reason });
			} catch {
				console.log('ОШИБКА:', responsError);
			}
		} else {
			console.log('Неизвестная ошибка:', responsError);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};


export const me = async (): Promise<void> => {
	window.store.set({ isLoading: true });
	try {
		const response = await authApi.me();
		if ('id' in response && 'login' in response) {
			window.store.set({
				user: response,
				isLogged: true,
				avatar: response.avatar,
			});
			getChats();
		} else {
			console.error('Unexpected response format', response);
		}
	} catch (responsError: unknown) {
		if (responsError instanceof Response) {
			const error: APIError = await responsError.json();
			window.store.set({ errorLabel: error.reason });
		} else {
			console.error('Unexpected error:', responsError);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const logOut = async (): Promise<string> => {
	try {
		const response = await authApi.logout();
		console.log('Ответ от logout:', response);
		if (response == 'OK') {
			window.store.set({ isLogged: false });
			window.router.go(ROUTER.signin);
			return 'Ok';
		} else {
			console.error('Ошибка при выходе, неверный ответ:', response);
			window.store.set({ errorLabel: 'Неизвестная ошибка при выходе' });
			return 'error';
		}
	} catch (error: unknown) {
		console.error('Ошибка при выполнении запроса:', error);
		window.store.set({ errorLabel: 'Ошибка при выполнении запроса' });
		return 'error';
	} finally {
		window.store.set({ isLoading: false, isLogged: false });
		window.router.go(ROUTER.signin);
	}
};

export const editProfile = async (model: UserDTO): Promise<void> => {
	window.store.set({ isLoading: true });

	try {
		const response = await profileApi.profileEdit<UserDTO>(model);

		if (
			typeof response === 'object' &&
			response !== null &&
			'id' in response &&
			'login' in response
		) {
			window.store.set({ user: response as UserDTO, isLogged: true });
		} else {
			console.error('Unexpected response format', response);
		}
	} catch (responsError: unknown) {
		if (responsError instanceof Response) {
			const error: APIError = await responsError.json();
			window.store.set({ errorLabel: error.reason });
		} else {
			console.error('Unexpected error:', responsError);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};

