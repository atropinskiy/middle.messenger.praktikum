import Handlebars from 'handlebars';
import Block from '@core/block';
import template from './button.hbs?raw';

interface ButtonProps {
  label: string;
  onClick: () => void;
  events?: Record<string, (event: Event) => void>;
}

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    const compiled = Handlebars.compile(template);
    return compiled(this.props); // Рендерим с переданными props
  }
}
