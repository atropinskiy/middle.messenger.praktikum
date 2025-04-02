/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './httpTransport';
import { CONSTATNS } from '../utils/constants';

describe('HTTPTransport', () => {
	let http: HTTPTransport;
	let requests: Array<any> = [];

	before(() => {
		global.XMLHttpRequest = class {
			open = sinon.stub();
			send = sinon.stub();
			setRequestHeader = sinon.stub();
			withCredentials = false;
			responseText = '';
			status = 200;
			responseHeaders: Record<string, string> = {};

			constructor() {
				requests.push(this);
			}

			getResponseHeader(name: string): string | null {
				return this.responseHeaders[name.toLowerCase()] || null;
			}
		} as any;
	});

	beforeEach(() => {
		requests = [];
		http = new HTTPTransport('/api/v2');
	});

	afterEach(() => {
		sinon.restore();
	});

	// ... предыдущие тесты GET и POST ...

	describe('PUT requests', () => {
		it('should send GET request to correct URL', async () => {
			const promise = http.get('/user');

			expect(requests).to.have.length(1);
			const xhr = requests[0];

			const [actualMethod, actualUrl] = xhr.open.firstCall.args;
			const expectedUrl = `${CONSTATNS.BASE_URL}/api/v2/user`;

			expect(actualMethod).to.equal('GET');
			expect(actualUrl).to.equal(expectedUrl);

			xhr.responseHeaders = { 'content-type': 'application/json' };
			xhr.responseText = JSON.stringify({ success: true });

			if (typeof xhr.onload === 'function') {
				xhr.onload(new Event('load'));
			}

			const response = await promise;
			expect(response).to.deep.equal({ success: true });
		});

		it('should send POST request with correct data and headers', async () => {
			const postData = { username: 'testuser', password: 'testpass' };
			const headers = { 'Custom-Header': 'value' };

			const promise = http.post('/login', {
				data: postData,
				headers: headers,
			});

			expect(requests).to.have.length(1);
			const xhr = requests[0];

			// Проверяем метод и URL
			const [actualMethod, actualUrl] = xhr.open.firstCall.args;
			expect(actualMethod).to.equal('POST');
			expect(actualUrl).to.equal(`${CONSTATNS.BASE_URL}/api/v2/login`);

			// Проверяем заголовки
			expect(xhr.setRequestHeader.calledWith('Custom-Header', 'value')).to.be
				.true;
			expect(
				xhr.setRequestHeader.calledWith('Content-Type', 'application/json')
			).to.be.true;

			// Проверяем отправленные данные
			expect(xhr.send.calledOnce).to.be.true;
			const sentData = JSON.parse(xhr.send.firstCall.args[0]);
			expect(sentData).to.deep.equal(postData);

			// Симулируем успешный ответ
			xhr.status = 200;
			xhr.responseText = JSON.stringify({ token: 'test-token' });
			xhr.responseHeaders = { 'content-type': 'application/json' };

			if (typeof xhr.onload === 'function') {
				xhr.onload(new Event('load'));
			}

			const response = await promise;
			expect(response).to.deep.equal({ token: 'test-token' });
		});

		it('should handle POST request errors', async () => {
			const promise = http.post('/login', {
				data: { username: 'test' },
			});

			const xhr = requests[0];
			xhr.status = 400;
			xhr.responseText = JSON.stringify({ error: 'Invalid data' });

			if (typeof xhr.onerror === 'function') {
				xhr.onerror(new Event('error'));
			}

			try {
				await promise;
				expect.fail('Request should have failed');
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
			}
		});

		it('should send PUT request with JSON data', async () => {
			const updateData = { name: 'New Name', age: 30 };

			const promise = http.put('/user/123', {
				data: updateData,
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			});

			expect(requests).to.have.length(1);
			const xhr = requests[0];

			// Проверяем метод и URL
			const [method, url] = xhr.open.firstCall.args;
			expect(method).to.equal('PUT');
			expect(url).to.equal(`${CONSTATNS.BASE_URL}/api/v2/user/123`);

			// Проверяем заголовки
			expect(
				xhr.setRequestHeader.calledWith('X-Requested-With', 'XMLHttpRequest')
			).to.be.true;
			expect(
				xhr.setRequestHeader.calledWith('Content-Type', 'application/json')
			).to.be.true;

			// Проверяем тело запроса
			expect(xhr.send.calledOnce).to.be.true;
			const sentData = JSON.parse(xhr.send.firstCall.args[0]);
			expect(sentData).to.deep.equal(updateData);

			// Симулируем ответ
			xhr.status = 200;
			xhr.responseText = JSON.stringify({ status: 'updated' });
			xhr.responseHeaders = { 'content-type': 'application/json' };
			xhr.onload(new Event('load'));

			const response = await promise;
			expect(response).to.deep.equal({ status: 'updated' });
		});

		it('should send PUT request with FormData', async () => {
			const formData = new FormData();
			formData.append(
				'file',
				new Blob(['test content'], { type: 'text/plain' }),
				'test.txt'
			);

			// Для тестирования FormData используем специальный метод putFile
			const promise = http.putFile('/upload', formData);

			expect(requests).to.have.length(1);
			const xhr = requests[0];

			// Проверяем метод и URL
			const [method, url] = xhr.open.firstCall.args;
			expect(method).to.equal('PUT');
			expect(url).to.equal(`${CONSTATNS.BASE_URL}/api/v2/upload`);

			// Проверяем что Content-Type не установлен (для FormData он должен устанавливаться автоматически)
			expect(xhr.setRequestHeader.calledWith('Content-Type')).to.be.false;

			// Проверяем что отправили FormData
			expect(xhr.send.calledOnce).to.be.true;
			expect(xhr.send.firstCall.args[0]).to.equal(formData);

			// Симулируем ответ
			xhr.status = 200;
			xhr.responseText = JSON.stringify({ filename: 'test.txt', size: 12 });
			xhr.responseHeaders = { 'content-type': 'application/json' };
			xhr.onload(new Event('load'));

			const response = await promise;
			expect(response).to.deep.equal({ filename: 'test.txt', size: 12 });
		});

		it('should handle PUT request errors', async () => {
			const promise = http.put('/user/123', {
				data: { name: 'Invalid' },
			});

			const xhr = requests[0];
			xhr.status = 400;
			xhr.responseText = JSON.stringify({ error: 'Validation failed' });
			xhr.onerror(new Event('error'));

			try {
				await promise;
				expect.fail('Request should have failed');
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
			}
		});
	});
});
