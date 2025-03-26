import Block from '@core/block';
import template from './avatar-upload-form.hbs?raw';
import { Button, InputField } from '@components/index';
import { uploadFile } from '../../services/chat';

interface AvatarUploadFormProps {
  className?: string;
  onClick?: (e: Event) => void;
}

interface AvatarUploadFormState {
  selectedFile: File | null;
}

export class AvatarUploadForm extends Block<AvatarUploadFormProps, AvatarUploadFormState> {
  constructor(props: AvatarUploadFormProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      },
      className: props.className || '',
    });
  }

  protected initChildren() {
    this.childrens.avatarInputField = new InputField({
      name: 'avatar-input',
      error: '',
      value: '',
      type: 'file',
      inputClasses: 'avatar-input cursor-pointer',
      placeholder: 'Выберите файл',
      onChange: (e: Event) => this.handleFileChange(e),
    });

    this.childrens.submitButton = new Button({
      label: 'Сохранить',
      name: 'saveButton',
      type: 'button',
      className: 'button w-100 mt-2',
      onClick: () => this.handleSubmit(),
    });
  }

  private handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    console.log('Файл до обновления состояния:', file?.name);
    console.log(file?.name, file?.type)

    if (file) {
      this.setState({ selectedFile: file });
      console.log(this.state)
    }
  }

  private handleSubmit() {
    if (this.state.selectedFile) {
      const file = this.state.selectedFile
      console.log('Файл для загрузки:', file, file.type, file.name);
      uploadFile(this.state.selectedFile)
    } else {
      console.log('Файл не выбран!');
    }
  }

  render() {
    console.log('Перерисовка', this.state)
    return this.compile(template, {});
  }
}

export default AvatarUploadForm;
