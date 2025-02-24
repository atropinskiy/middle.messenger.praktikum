import Block from '@core/block';

interface ButtonProps {
  buttonClass?: string;
  textClass?: string;
  text: string;
  type?: 'submit' | 'button';
  onClick?: () => void; // Может быть undefined
  events?: { // Добавляем параметр events в ButtonProps
    click?: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      events: { click: onClick }, // Теперь передаем события, включая обработчик click
    });
  }

  render() {
    return `
      <button class="{{buttonClass}}" type="{{type}}">
        <div class="{{textClass}}">{{text}}</div>
      </button>
    `;
  }
}

export default Button;
