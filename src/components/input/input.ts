import Block from '@core/block';

import template from './input.hbs?raw';

export interface InputProps {
  onChange?: (e: Event) => void;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  autocomplete?: string;
  value?: string;
  error?: string | null;
  parentClasses?: string
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        change: props.onChange,
      },
    });
  }

  public hasError(): boolean {
    return Boolean(this.props.error);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Input;
