import Block from '@core/block';
import template from './error-label.hbs?raw';

interface ErrorLabelProps {
  label: string
}

export class ErrorLabel extends Block {
  constructor(props: ErrorLabelProps) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ErrorLabel;
