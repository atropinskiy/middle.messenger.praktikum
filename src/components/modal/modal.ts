// src/components/modal/modal.ts
import Block from '@core/block';
import template from './modal.hbs?raw';
import { Button } from '@components/button';
import { connect } from '@utils/connect';
import { InputField, SearchList } from '@components/index';

interface ModalProps {
  title: string;
  content: string;
  inputSettings?: {name: string, value: string};
  onOkClick: (inputValue: string) => void,
  placeHolder?: string
}

interface ModalState {
  inputContent: string
  showOk: boolean
}

export class Modal extends Block<ModalProps, ModalState> {
  constructor(props:ModalProps) {
    super(props);
    this.setState({inputContent: '', showOk: false})
  }

  protected initChildren() {
    if (this.props.inputSettings) {
      this.childrens.input = new InputField({
        name:this.props.inputSettings.name,
        value:this.state.inputContent,
        error:"",
        inputClasses:"signin-login-input w-100",
        placeholder:this.props.placeHolder,
        onChange: (e) => {
          const input = e.target as HTMLInputElement;
          this.setState({inputContent: input.value})
        }
      })
    }
    this.childrens.searchList = new SearchList({})

    this.childrens.closeBtn = new Button ({
      label: 'x',
      name: 'closeModal',
      type: 'button',
      className: "modal-close-btn",
      onClick: () => {
        window.store.set({ openedModal: false})
      }
    })

    this.childrens.createBtn = new Button ({
      label: "Создать",
      name: "create",
      type: "submit",
      className: "button w-100 mt-4",
      onClick: () => {
        const inputValue = this.state.inputContent
        if (inputValue) {
          this.props.onOkClick(inputValue)
        }
      }
    })
  }

  render() {
    return this.compile(template, {...this.props}, {...this.state});
  }
}

const mapStateToProps = (state: any) => ({
  openedModal: state.openedModal,
});

export default connect(mapStateToProps)(Modal);

