import Block from '@core/block';
import template from './chat-dialog.hbs?raw';
import { MessageModel } from '@models/chat';
import { Stub } from '@components/index';

interface ChatDialogProps {
  messages: MessageModel[];
}

export class ChatDialog extends Block {
  constructor(props: ChatDialogProps) {
    super({
      ...props,
    });
  }

  protected initChildren(): void {
    this.childrens.stub = new Stub({
      label: "Нет сообщений, начните диалог или выберите чат"
    })  
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

