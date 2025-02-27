import Block from '@core/block';

import template from './input.hbs?raw';

export interface InputProps {
  onChange?: () => void,
  placeholder: string
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        change: props.onChange
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Input;