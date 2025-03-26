import { HTTPTransport } from '../core/httpTransport';
import { UserDTO } from './type';

const authApi = new HTTPTransport('/user');

export default class ProfileApi {
	async profileEdit<T = unknown>(data: UserDTO): Promise<T> {
		return authApi.put('/profile', { data });
	}

	async uploadAvatar(data: FormData): Promise<UserDTO | string> {
		return authApi.putFile('/profile/avatar', data);
	}
}
