import Block from '@core/block';
import template from './chat-dialog.hbs?raw';
import { Stub } from '@components/index';
import { connect } from '@utils/connect';
import { IChatMessage } from 'api/type';

interface ChatDialogProps {
  currentMessages?: IChatMessage[]
}

class ChatDialog extends Block {
  constructor(props: ChatDialogProps) {
    super(props);
  }

  protected initChildren(): void {
    this.childrens.stub = new Stub({
      label: "Нет сообщений, начните диалог или выберите чат"
    })  
  }

  render() {
    console.log('Пропсы', this.props)
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentMessages: state.currentMessages,
    myUser: state.user.id
  };
};

export default connect(mapStateToProps)(ChatDialog);

