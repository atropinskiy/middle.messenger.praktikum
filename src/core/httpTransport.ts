/* eslint-disable */
import { CONSTATNS } from '@utils/constants';

enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	data?: any;
	headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = <R = unknown>(
	url: string,
	options?: OptionsWithoutMethod
) => Promise<R>;
export class HTTPTransport {
	private apiUrl: string = '';

	constructor(apiPath: string) {
		this.apiUrl = `${CONSTATNS.BASE_URL}${apiPath}`;
	}

	get: HTTPMethod = (url, options = {}) => {
		let fullUrl = `${this.apiUrl}${url}`;

		if (options.data) {
			const params = new URLSearchParams(
				options.data as Record<string, string>
			).toString();
			fullUrl += `?${params}`;
		}

		return this.request(fullUrl, {
			...options,
			method: METHOD.GET,
			data: undefined,
		});
	};

	post: HTTPMethod = (url, options = {}) =>
		this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });

	put: HTTPMethod = (url, options = {}) =>
		this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });

	delete: HTTPMethod = (url, options = {}) =>
		this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });

	putFile = <TResponse>(url: string, data: FormData): Promise<TResponse> =>
		this.request<TResponse>(`${this.apiUrl}${url}`, {
			method: METHOD.PUT,
			data,
		});

	private async request<TResponse>(
		url: string,
		options: Options = { method: METHOD.GET }
	): Promise<TResponse> {
		const { method, data, headers = {} } = options;

		return new Promise<TResponse>((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url, true);
			xhr.withCredentials = true;

			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			if (data && !(data instanceof FormData)) {
				xhr.setRequestHeader('Content-Type', 'application/json');
			}

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					const contentType = xhr.getResponseHeader('Content-Type') || '';

					try {
						if (contentType.includes('application/json')) {
							resolve(JSON.parse(xhr.responseText) as TResponse);
						} else {
							resolve(xhr.responseText as unknown as TResponse);
						}
					} catch (error) {
						console.error('Ошибка парсинга JSON:', error);
						resolve(xhr.responseText as unknown as TResponse);
					}
				} else {
					reject(xhr);
				}
			};

			xhr.onerror = () => reject(new Error('Ошибка сети'));
			xhr.ontimeout = () =>
				reject(new Error('Превышено время ожидания запроса'));

			if (data instanceof FormData) {
				xhr.send(data);
			} else if (data) {
				xhr.send(JSON.stringify(data));
			} else {
				xhr.send();
			}
		});
	}
}
