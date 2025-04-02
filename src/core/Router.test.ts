/* eslint-disable */
import Router from './Router';
import { expect } from 'chai';
import sinon from 'sinon';
import { Store } from './Store';
import Block from './block';

describe('Router', () => {
	let router: Router;
	let pushStateStub: sinon.SinonStub;
	let store: any;

	const template = `<div><h1>Template</h1><div>`;

	interface TestBlockProps {
		base: string;
	}

	interface TestBlockState {
		count: number;
	}

	class TestBlock extends Block<TestBlockProps, TestBlockState> {
		constructor() {
			super({ base: 'baseProp' });
		}

		componentDidMount() {
			super.componentDidMount();
		}

		componentDidUpdate(oldProps: any, newProps: any): boolean {
			return super.componentDidUpdate(oldProps, newProps);
		}

		render() {
			return this.compile(template, {});
		}
	}

	interface Route {
		render: () => void;
	}

	beforeEach(() => {
		pushStateStub = sinon.stub(window.history, 'pushState');
		router = new Router('#root');

		store = new Store({
			isLoading: false,
			user: null,
			isLogged: false,
			errorLabel: '',
			openedModal: false,
			chats: [],
			currentMessages: [],
			currentChatId: 0,
			currentChatName: '',
			currentChatUsers: [],
			searchUsers: [],
			avatar: 'img/avatar_mock.jpg',
		});

		sinon.stub(store, 'set');

		window.store = store;
	});

	afterEach(() => {
		sinon.restore();
	});

	it('должен корректно добавлять маршруты через use', () => {
		const routePath = '/signin';
		const block = TestBlock;
		router.use(routePath, block);

		// Проверяем, что маршрут добавлен
		const route = router.getRoute(routePath);
		expect(route).to.not.be.undefined;
	});

	it('должен корректно переходить по пути с go', () => {
		router.go('/signin');

		expect(pushStateStub.calledOnce).to.be.true;
		expect(pushStateStub.firstCall.args).to.deep.equal([{}, '', '/signin']);
		expect(store.set.calledOnceWith({ errorLabel: '' })).to.be.true;
	});

	it('должен корректно переходить назад с back', () => {
		const backStub = sinon.stub(window.history, 'back');
		router.back();
		expect(backStub.calledOnce).to.be.true;
	});

	it('должен корректно переходить вперёд с forward', () => {
		const forwardStub = sinon.stub(window.history, 'forward');
		router.forward();
		expect(forwardStub.calledOnce).to.be.true;
	});

	it('должен корректно обрабатывать маршрут для незарегистрированного пути', () => {
		const spy = sinon.spy(console, 'warn');
		router._onRoute('/non-existing-path');
		expect(spy.calledOnce).to.be.true;
		expect(spy.calledWith('Маршрут для /non-existing-path не найден!')).to.be
			.true;
		spy.restore();
	});

	it('должен корректно вызывать render для существующего маршрута', () => {
		const routePath = '/messenger';
		const block = TestBlock;
		router.use(routePath, block);
		const route = router.getRoute(routePath) as Route;
		const spyRender = sinon.spy(route, 'render');
		router._onRoute(routePath);
		expect(spyRender.calledOnce).to.be.true;
	});
});
