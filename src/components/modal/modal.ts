// src/components/modal/modal.ts
import Block from '@core/block';
import template from './modal.hbs?raw';
import { Button } from '@components/button';
import { connect } from '@utils/connect';

interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
}



export class Modal extends Block<ModalProps> {
  constructor(props:ModalProps) {
    super(props);
  }
  
  protected initChildren() {
    this.childrens.closeBtn = new Button ({
      label: 'x',
      name: 'closeModal',
      type: 'button',
      onClick: () => {
        window.store.set({ isModalOpen: false})
      }
    })

  }

  render() {
    console.log('222',this.props)
    return this.compile(template, {...this.props}, {...this.state});
  }
}

const mapStateToProps = (state: any) => ({
  isOpen: state.isModalOpen,
});

export default connect(mapStateToProps)(Modal);

