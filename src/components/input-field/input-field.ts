import Block from '@core/block';
import template from './input-field.hbs?raw';
import { Input } from '@components/index';

interface InputFieldProps {
  name: string;
  value?: string;
  error?: string;
  placeholder?: string;
  inputClasses?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void
}

export class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super(props);
    console.log("Создан InputField с onBlur:", props.onBlur);
  }
  protected initChildren() {
    this.childrens.InputField = new Input({
      name: this.props.name,
      placeholder: this.props.placeholder,
      value: this.props.value,
      className: this.props.inputClasses,
      onChange: this.props.onChange,
      onBlur: this.props.onBlur
    })
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
