import { RouteInterface } from "./Router";
import Block from "./block";
import renderDOM from '@core/renderDom'

const updatePageTitle = (title: string): void => {
  document.title = title;
};

class Route implements RouteInterface {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: any;

  constructor(pathname: string, view: typeof Block, props: Object) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    if (this._props.title) updatePageTitle(this._props.title);

    renderDOM(this._props.rootQuery, this._block);
  }
}

export default Route;
