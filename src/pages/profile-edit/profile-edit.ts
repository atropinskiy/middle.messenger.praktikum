import Block from '@core/block';
import template from './profile-edit.hbs?raw';
import { CurrentUserMock } from '../../mock-data/current-user';
import { ProfileEditCell, Button, InputField, Avatar } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';


interface ProfileEditState {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  chat_name: string;
  phone: string;
}
export class ProfileEdit extends Block<object, ProfileEditState> {

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

    };
    console.log("ProfileEdit state при инициализации:", this.state);
  }

  protected initChildren() {
    // this.childrens.avatar = new Avatar({
    //   src:""
    // }),
    Object.entries(CurrentUserMock)
      .filter(([key]) => key !== "avatar_url")
      .forEach(([key, value]) => {
        this.childrens[key] = new ProfileEditCell({
          label: key || "",
          input: new InputField({
            name: key,
            placeholder: `Введите ${key}`,
            value: value || "",
            error: "",
            inputClasses: "text-right ml-auto",
            parentClasses: "",
            onChange: (e: Event) => {
              const input = e.target as HTMLInputElement;
              const validationErrors = Validator.validate({ [key]: input.value }, this.fieldLabels);
              const fieldErrors = validationErrors[key] || []; 
              this.childrens[key].setProps({error:fieldErrors, value: input.value})
              this.setState((prevState) => ({
                ...prevState,
                value: input.value,
                [key]: input.value
              }))
            },
          })
        });

      });
    this.childrens.resultButton = new Button({
      label: "Сохранить",
      name: "save",
      type: "button",
      className: "button w-100 mt-2",
      onClick: () => {
        this.handleSave()
      }
    });
    this.childrens.avatar = new Avatar ({
      src: 'img/avatar_mock.jpg',
      className: 'avatar mb-2',
      width: 130
    })
  }

  private handleSave() {
    const validationErrors: Record<string, string> = {};
    (Object.keys(this.state) as Array<keyof Omit<ProfileEditState, "errors">>).forEach((key) => {
      const fieldErrors = Validator.validate({ [key]: this.state[key] }, this.fieldLabels)[key] || [];
      if (fieldErrors.length > 0) {
        validationErrors[key] = fieldErrors.join(", ");
      }
    });
  
    Object.entries(validationErrors).forEach(([key, error]) => {
      this.childrens[key]?.setProps({ error });
    });
  
    if (Object.keys(validationErrors).length === 0) {
      console.log("Форма успешно сохранена:", this.state);
    } else {
      console.log("Форма содержит ошибки:", validationErrors);
    }
  }
  
  render() {
    return this.compile(template, {});
  }
}
