import Block from '@core/block';

import template from './button.hbs?raw';

interface ButtonProps {
  type: string;
  name: string;
  text?: string;
  classes?: string;
  block?: Block;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;