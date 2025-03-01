import Block from '@core/block';
import template from './profile-edit.hbs?raw';
import { CurrentUserMock } from '../../mock-data/current-user';
import { Input, ProfileEditCell, Button } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';

export default class ProfileEdit extends Block<Record<string, UserModel>> {
  private fieldLabels: UserModel = {
    login: "Логин",
    email: "Почта",
    first_name: "Имя",
    second_name: "Фамилия",
    chat_name: "Имя в чате",
    phone: "Телефон",
  };

  constructor() {
    super();
    this.state = { 
      login: CurrentUserMock.login || '',
      email: CurrentUserMock.email || '',
      first_name: CurrentUserMock.first_name || '',
      second_name: CurrentUserMock.second_name || '',
      chat_name: CurrentUserMock.chat_name || '',
      phone: CurrentUserMock.phone || '',
      isFormValid: false,
      errors: []
    };
  }
  protected initChildren() {
    Object.entries(CurrentUserMock)
      .filter(([key]) => key !== "avatar_url")
      .forEach(([key, value]) => {
        this.childrens[key] = new ProfileEditCell({
          label: key,
          input: new Input({
            name: key,
            placeholder: value,
            value: value,
            className: "text-right",
            parentClasses: "d-flex justify-end",
            onChange: (e) => {
              const input = e.target as HTMLInputElement;
              this.setState({
                [key]: input.value
              });
              
            }
          })
        });
      });
    this.childrens.resultButton = new Button({
      label: "Сохранить",
      name: "save",
      type: "button",
      className: "button w-100 mt-2",
      onClick: () => {
        this.handleSave();
      }
    })
  }

  handleSave() {
    const errors = Validator.validate(this.state, this.fieldLabels); 
    if (errors.length > 0) {
      this.setState({
        errors: errors
      });
      console.log('Ошибки валидации:', errors);
    } else {
      console.log('Данные сохранены:', this.state);
    }
  }

  

  render() {
    const childrensArray = Object.values(this.childrens).map(child => child.getContent()?.outerHTML || '');
    const context = { childrens: childrensArray };
    return this.compile(template, context);
  }
}
