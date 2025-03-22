/* eslint-disable */
import isEqual from '@utils/isEqual';
import EventBus from './eventBus';
import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

class Block<
  TProps extends Record<string, any> = {},
  TState extends Record<string, any> = {}
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _id = nanoid(6);

  private _element: HTMLElement | null = null;

  protected props: TProps;
  protected childrens: Record<string, Block>;
  private eventBus: () => EventBus;
  protected state: TState;

  /** JSDoc
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(propsAndChildrens: any = {}, initialState?: TState) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, childrens } = this.getChildren(propsAndChildrens);

    this.childrens = childrens;

    this.props = this._makePropsProxy(props);
    this.state = this._makeStateProxy(initialState || ({} as TState));

    this.initChildren();

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {
    return;
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return !isEqual(oldProps, newProps);
  }

  public getProps(): TProps {
    return this.props;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) return;

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
  };


  public setState(update: Partial<TState> | ((prevState: TState) => Partial<TState>)) {
    const newState = typeof update === "function" ? update(this.state) : update;

    const updatedState = Object.keys(newState).reduce((acc, key) => {
      const value = newState[key as keyof TState];

      if (Array.isArray(value)) {
        acc[key as keyof TState] = [...value] as TState[keyof TState]; // Клонируем массив
      } else if (typeof value === "object" && value !== null) {
        acc[key as keyof TState] = { ...value } as TState[keyof TState]; // Клонируем объект
      } else {
        acc[key as keyof TState] = value;
      }

      return acc;
    }, {} as Partial<TState>);

    // Теперь безопасно обновляем state
    Object.assign(this.state, updatedState);

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }




  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;
  
    if (!newElement) {
      return;
    }
  
    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    } else {
    }
  
    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get: (target, prop) => target[prop as keyof TProps],
      set: (target, prop, value) => {
        const oldProps = { ...target };
        target[prop as keyof TProps] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
    });
  }

  private _makeStateProxy(state: TState) {
    return new Proxy(state, {
      get: (target, prop) => target[prop as keyof TState],
      set: (target, prop, value) => {
        const oldState = { ...target };
        target[prop as keyof TState] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldState, target);
        return true;
      },
    });
  }

  public componentWillUnmount() {
    this._removeEvents();
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show() {
    const el = this.getContent();

    if (el) el.style.display = 'flex';
  }

  public hide() {
    const el = this.getContent();

    if (el) el.style.display = 'none';
  }


  protected getChildren(propsAndChildrens: any) {
    const childrens: any = {};
    const props: any = {};

    Object.entries(propsAndChildrens).map(([key, value]) => {
      if (value instanceof Block) {
        childrens[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, childrens };
  }

  protected initChildren() {
    return;
  }

  protected compile(templateString: string, context: any, additionalData: any = {}) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    // Сначала добавляем данные из this.childrens
    Object.entries(this.childrens).forEach(([key, child]) => {
      context[key] = `<div data-id="id-${child._id}"></div>`;
    });

    // Добавляем дополнительные данные в контекст
    Object.entries(additionalData).forEach(([key, value]) => {
      context[key] = value;
    });

    // Компилируем строку шаблона в функцию
    const template = Handlebars.compile(templateString);

    // Генерируем HTML строку с учетом всех данных
    const htmlString = template(context);

    fragment.innerHTML = htmlString;

    // Заменяем placeholders на реальные элементы
    Object.entries(this.childrens).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child._id}"]`);
      if (!stub) return;
      stub.replaceWith(child.getContent() as HTMLElement);
    });

    return fragment.content;
  }

}

export default Block;
