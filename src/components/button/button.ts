import Block from "../../core/block";
import Handlebars from "handlebars";
import template from "./button.hbs?raw";

interface ButtonProps {
  id?: string;
  label: string;
  className?: string;
  onClick?: (e: Event) => void;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", {
      ...props,
    });
  }

  public render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
