import Block from '@core/block';
import template from './error-label.hbs?raw';

interface ErrorLabelProps {
  label: string
}

export class ErrorLabel extends Block<ErrorLabelProps> {
  constructor(props: { label: string }) {
    super({
      ...props
    });
    
  }



  render() {
    console.log(this.props)
    return this.compile(template, { ...this.props });
  }
}

export default ErrorLabel;
