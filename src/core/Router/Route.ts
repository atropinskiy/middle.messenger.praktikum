class Route {
  private pathname: string;
  private blockClass: any;
  private block: any | null;
  private props: Record<string, any>;

  constructor(pathname: string, blockClass: any, props: Record<string, any>) {
      this.pathname = pathname;
      this.blockClass = blockClass;
      this.block = null;
      this.props = props;
  }

  navigate(pathname: string) {
      if (pathname === this.pathname) {
          this.render();
      }
  }

  leave() {
      if (this.block) {
          this.block.hide();
      }
  }

  render() {
      if (!this.block) {
          this.block = new this.blockClass(this.props);
          document.querySelector('#app')?.appendChild(this.block.getContent());
      }
      this.block.show();
  }
}