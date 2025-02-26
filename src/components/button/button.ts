import Block from "../../core/block";
import Handlebars from "handlebars";
import template from "./button.hbs?raw";  // Подключаем шаблон

interface ButtonProps {
  id?: string;
  label: string;
  className?: string;
  type?: string;
  onClick?: (e: Event) => void;
  events?: {
    click?: (e: Event) => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", {
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    const compiledTemplate = Handlebars.compile(template); 
    return compiledTemplate(this.props);
  }
}
