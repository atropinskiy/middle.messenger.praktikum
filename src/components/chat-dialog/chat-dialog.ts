import Block from '@core/block';
import template from './chat-dialog.hbs?raw';
import { MessageModel } from '@models/chat';

interface ChatDialogProps {
  messages: MessageModel[]
}

export class ChatDialog extends Block {
  constructor(props: ChatDialogProps) {
    super({
      ...props,
    }
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatDialog;