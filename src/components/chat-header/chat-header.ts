import Block from '@core/block';
import template from './chat-header.hbs?raw';

interface ChatHeaderProps {
  avatar_url: string;
  name: string;
}

export class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatHeader;
