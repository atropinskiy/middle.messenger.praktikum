import Block from '@core/block';
import template from './profile-edit.hbs?raw';
import { ProfileEditCell, Button, InputField, Avatar } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';
import { withRouter } from '@utils/withrouter';
import { connect } from '@utils/connect';


interface ProfileEditState {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
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
  }

  protected initChildren() {
    const store = window.store.getState()
    const user = store.user
    if (!user) {
      return;
    }
    Object.entries(user)
      .filter(([key]) => key !== "id")
      .forEach(([key, value]) => {
        this.childrens[key] = new ProfileEditCell({
          label: key || "",
          input: new InputField({
            name: key,
            placeholder: `Введите ${key}`,
            value: String(value) || "",
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

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(ProfileEdit));
