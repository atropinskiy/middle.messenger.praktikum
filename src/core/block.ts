import EventBus from "./eventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

export default class Block<P extends Record<string, any> = {}> {
  static EVENTS = {
    INIT: "INIT",
    FLOW_CDM: "FLOW_CDM",
    FLOW_CDU: "FLOW_CDU",
    FLOW_RENDER: "FLOW_RENDER",
  } as const; // <- Используем `as const` для строгой типизации ключей

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: P } | null = null;
  private _id: string = nanoid(6);
  props: P;
  children: Record<string, Block | Block[]>;
  private eventBus: () => EventBus<keyof typeof Block.EVENTS>;

  constructor(tagName: string = "div", propsWithChildren: P = {} as P) {
    const eventBus = new EventBus<keyof typeof Block.EVENTS>();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<keyof typeof Block.EVENTS>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    if (!this._meta) return;
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === "string") {
      this._element.classList.add(...props.className.split(" "));
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildrenAndProps(propsAndChildren: P): { children: Record<string, Block | Block[]>; props: P } {
    const children: Record<string, Block | Block[]> = {};
    const props: P = {} as P;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        (props as any)[key] = value;
      }
    });

    return { children, props };
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._render();
    }
  }

	// @ts-ignore
  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  setProps(nextProps: Partial<P>): void {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props as any;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as any;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

	
	private _makePropsProxy(props: P): P {
		const eventBus = this.eventBus();
		// @ts-ignore
		const emitBind = eventBus.emit.bind(eventBus);
	
		return new Proxy(props as Record<string, any>, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop: string, value) {
				const oldTarget = { ...target };
				target[prop] = value; 
				eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		}) as P; 
	}
	get id(): string {
		return this._id;
	}
	

	private _compile(): DocumentFragment {
		const propsAndStubs: Record<string, any> = { ...this.props }; // Приведение к Record<string, any>
	
		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
			} else {
				propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
			}
		});
	
		const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template(propsAndStubs);
	
		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((component) => {
					const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
					const content = component.getContent();
					if (stub && content) {
						stub.replaceWith(content);
					}
				});
			} else {
				const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
				const content = child.getContent();
				if (stub && content) {
					stub.replaceWith(content);
				}
			}
			
		});
	
		return fragment.content;
	}

  private _render(): void {
    this._removeEvents();
    const block = this._compile();
    this._element?.replaceChildren(block);
    this._addEvents();
  }

  render(): string {
    return "";
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent()?.style.setProperty("display", "block");
  }

  hide(): void {
    this.getContent()?.style.setProperty("display", "none");
  }
}
