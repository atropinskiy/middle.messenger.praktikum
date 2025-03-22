// src/components/modal/modal.ts
import Block from '@core/block';
import template from './modal.hbs?raw';
import { Button } from '@components/button';
import { connect } from '@utils/connect';
import { InputField } from '@components/input-field';

interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  inputSettings: {name: string, value: string};
  onOkClick?: () => {}
}



export class Modal extends Block<ModalProps> {
  constructor(props:ModalProps) {
    super(props);
  }

  

  protected initChildren() {
    this.childrens.input = new InputField({
      name:this.props.inputSettings.name,
      value:"",
      error:"",
      inputClasses:"signin-login-input w-100",
      placeholder:"Логин"
    })

    this.childrens.closeBtn = new Button ({
      label: 'x',
      name: 'closeModal',
      type: 'button',
      className: "modal-close-btn",
      onClick: () => {
        window.store.set({ isModalOpen: false})
      }
    })

    this.childrens.createBtn = new Button ({
      label: "Создать",
      name: "create",
      type: "submit",
      className: "button w-100 mt-4",
      onClick: this.props.onOkClick
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

