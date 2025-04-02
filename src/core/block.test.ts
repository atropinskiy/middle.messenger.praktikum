import { expect } from 'chai';
import sinon from 'sinon';
import Block from './block'; // Путь должен быть корректным

// Простой тестовый компонент с явным определением метода componentDidMount
class TestBlock extends Block<{ title: string }> {
  render(): DocumentFragment {
    const fragment = document.createElement('template');
    fragment.innerHTML = `<div>${this.props.title}</div>`;
    return fragment.content;
  }

  componentDidMount() {
    console.log('componentDidMount was called');
  }
}

describe('Block', () => {
  let instance: TestBlock;

  beforeEach(() => {
    instance = new TestBlock({ title: 'Hello' });
  });

  it('должен корректно инициализироваться', () => {
    expect(instance).to.be.an.instanceof(Block);
  });

  it('должен устанавливать пропсы', () => {
    instance.setProps({ title: 'New Title' });
    expect(instance.getProps().title).to.equal('New Title');
  });

  it('должен вызывать componentDidMount при монтировании', () => {
    const spy = sinon.spy(instance, 'componentDidMount');
    instance.show();  // Здесь мы вызываем метод, который должен вызвать componentDidMount
    expect(spy.calledOnce).to.be.true;
  });

  it('должен скрывать элемент при вызове hide()', () => {
    instance.hide();
    expect(instance.getContent()?.style.display).to.equal('none');
  });
});
