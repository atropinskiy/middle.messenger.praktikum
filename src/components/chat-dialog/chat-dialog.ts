import Block from '@core/block';
import template from './chat-dialog.hbs?raw';
import { MessageModel } from '@models/chat';

interface ChatDialogProps {
  messages: MessageModel[];
}

export class ChatDialog extends Block {
  constructor(props: ChatDialogProps) {
    super({
      ...props,
    });
  }

  protected componentDidUpdate(oldProps: ChatDialogProps, newProps: ChatDialogProps) {
    console.log("Перерисовк")
    return oldProps.messages !== newProps.messages; 
    
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatDialog;

