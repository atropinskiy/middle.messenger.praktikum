import Block from '@core/block';

import template from './input.hbs?raw';

export interface IInput {
  type: string;
  name: string;
  value?: string;
  classes?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  validate?: boolean;
  autocomplete?: 'on' | 'off';
}

class Input extends Block {
  constructor(props: IInput) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Input;