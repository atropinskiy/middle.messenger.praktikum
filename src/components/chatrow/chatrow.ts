import Block from '@core/block';
import Handlebars from 'handlebars';
import template from './chatrow.hbs?raw';


Handlebars.registerPartial('chatRow', template);
interface ChatRowProps {
  id: string;
  onClick?: () => void
}

export class ChatRow extends Block {
  constructor(props: ChatRowProps) {
    super({
      ...props,
      events: {
        click: props.onClick 
      }
    }
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}