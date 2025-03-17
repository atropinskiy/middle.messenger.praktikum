import Block from '@core/block';

import template from './link.hbs?raw';

interface LinkProps {
  className?: string;
  href: string;
  label: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      className: props.className,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;
