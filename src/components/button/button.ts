import Block from '@core/block';

import template from './button.hbs?raw';

interface ButtonProps {
  type: string;
  name: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      className: props.className,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;
