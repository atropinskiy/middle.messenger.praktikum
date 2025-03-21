import Block from '@core/block';

import template from './chat-menu-item.hbs?raw';

interface ChatMenuItemProps {
  onClick?: (e: Event) => void;
  label: string,
  icon: string,
  className?: string,
}

export class ChatMenuItem extends Block {
  constructor(props: ChatMenuItemProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatMenuItem;
