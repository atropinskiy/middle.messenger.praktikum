export function queryStringify(
	data: Record<string, string | number | boolean>
): string {
	if (typeof data !== 'object' || data === null) {
		throw new Error('Data must be an object');
	}

	const keys = Object.keys(data);
	return keys.length
		? '?' +
				keys
					.map(
						(key) =>
							`${encodeURIComponent(key)}=${encodeURIComponent(
								String(data[key])
							)}`
					)
					.join('&')
		: '';
}

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

interface Options {
	method?: METHODS;
	data?: Record<string, unknown> | FormData | string;
	headers?: Record<string, string>;
}

class HTTPTransport {
	get(url: string, options: Options = {}) {
		return this.request(url, { ...options, method: METHODS.GET });
	}

	post(url: string, options: Options = {}) {
		return this.request(url, { ...options, method: METHODS.POST });
	}

	put(url: string, options: Options = {}) {
		return this.request(url, { ...options, method: METHODS.PUT });
	}

	delete(url: string, options: Options = {}) {
		return this.request(url, { ...options, method: METHODS.DELETE });
	}

	request(
		url: string,
		options: Options,
		timeout = 5000
	): Promise<XMLHttpRequest> {
		const { headers = {}, method = METHODS.GET, data } = options;
		const isGet = method === METHODS.GET;

		// Корректно формируем URL для GET-запросов
		const requestUrl =
			isGet && data
				? `${url}${queryStringify(
						data as Record<string, string | number | boolean>
				  )}`
				: url;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, requestUrl); // Теперь передаются два аргумента: method и URL

			// Устанавливаем заголовки
			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			xhr.onload = () => resolve(xhr);
			xhr.onabort = () => reject(new Error('Запрос был прерван'));
			xhr.onerror = () => reject(new Error('Произошла ошибка сети'));
			xhr.ontimeout = () =>
				reject(new Error('Превышено время ожидания запроса'));
			xhr.timeout = timeout;

			if (isGet || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else if (typeof data === 'object') {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(data));
			} else {
				xhr.send(data);
			}
		});
	}
}

export default new HTTPTransport();
