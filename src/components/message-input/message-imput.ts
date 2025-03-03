import Block from '@core/block';
import template from './message-input.hbs?raw';
import { Button, Input } from '@components/index';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  message: string; // добавляем свойство message
}

export class MessageInput extends Block<MessageInputProps> { // Указываем тип props в классе
  constructor(props: MessageInputProps) {
    super(props); // Передаем props в родительский конструктор
  }

  protected initChildren(): void {
    this.childrens.messageInput = new Input({
      name: 'message',
      className: 'msg-input',
      type: 'text',
      autocomplete: 'No',
      placeholder: 'Введите сообщение',
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        this.setProps({ message: input.value });
      },
    });

    this.childrens.sendButton = new Button({
      label: '->',
      name: 'send-button',
      type: 'button',
      className: 'send-button',
      onClick: () => {
        const message = this.props.message;
        if (message) {
          this.props.onSendMessage(message); // Вызываем onSendMessage, переданный как пропс
          this.setProps({ message: '' }); // Очистить поле ввода после отправки
          console.log(message)
        }
      },
    });
  }

  render() {
    console.log(this.props);
    return this.compile(template, { ...this.props });
  }
}
