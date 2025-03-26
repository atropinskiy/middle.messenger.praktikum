import Block from '@core/block';
import template from './link.hbs?raw';

interface LinkProps {
  className?: string;
  onClick?: (e: Event) => void;
  label: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      className: props.className,
      events: {
        click: props.onClick,
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;
