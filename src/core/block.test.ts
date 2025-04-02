/* eslint-disable */
import Block from './block';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Block', () => {
	const template = `<div><h1>Template</h1></div>`;

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
			super.componentDidMount(); // Вызов родительского метода (если нужен)
		}

		componentDidUpdate(oldProps: any, newProps: any): boolean {
			return super.componentDidUpdate(oldProps, newProps); // Вызов родительского метода
		}

		render() {
			return this.compile(template, {});
		}
	}

	let block: TestBlock;

	beforeEach(() => {
		block = new TestBlock();
	});

	afterEach(() => {
		sinon.restore();
	});

	it('должен корректно обновлять свойства через setProps', () => {
		block.setProps({ base: 'newProp' });
		expect(block.getProps().base).to.equal('newProp');
	});

	it('должен корректно обновлять состояние через setState', () => {
		block.setState({ count: 1 });
		expect(block.getState().count).to.equal(1); // Используем getState() для получения состояния
	});

	it('должен возвращать HTML элемент через getContent', () => {
		expect(block.getContent()).to.be.instanceOf(HTMLElement);
	});

	it('должен скрывать элемент при вызове hide', () => {
		block.hide();
		expect(block.getContent()?.style.display).to.equal('none');
	});

	it('должен показывать элемент при вызове show', () => {
		block.hide();
		block.show();
		expect(block.getContent()?.style.display).to.equal('flex');
	});

	it('должен вызывать componentDidMount при монтировании', () => {
		const spy = sinon.spy(TestBlock.prototype, 'componentDidMount');
		block = new TestBlock();
		expect(spy.calledOnce).to.be.true;
	});

	it('должен корректно размонтироваться при componentWillUnmount', () => {
		const spy = sinon.spy(block, 'componentWillUnmount');
		block.componentWillUnmount();
		expect(spy.calledOnce).to.be.true;
	});

	it('должен корректно компилировать шаблон', () => {
		const compiled = block.render();
		expect(compiled).to.be.instanceOf(DocumentFragment);
	});
});
