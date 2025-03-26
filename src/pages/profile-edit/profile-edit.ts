import Block from '@core/block';
import template from './profile-edit.hbs?raw';
import { ProfileEditCell, Button, InputField, Avatar, BackDiv, Modal } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';
import { withRouter } from '@utils/withrouter';
import { connect } from '@utils/connect';
import * as authServices from "../../services/auth";
import { CONSTATNS } from '@utils/constants';

interface ProfileEditProps {
  openedModal?: 'createChat' | 'addUser' | 'uploadAvatar' | false
}

interface ProfileEditState {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}
export class ProfileEdit extends Block<ProfileEditProps, ProfileEditState> {

  private fieldLabels: UserModel = {
    login: "Логин",
    email: "Почта",
    first_name: "Имя",
    second_name: "Фамилия",
    display_name: "Имя в чате",
    phone: "Телефон",
  };

  constructor(props: ProfileEditProps) {
    super({ ...props });
  }

  protected initChildren() {
    const store = window.store.getState()
    const user = store.user ?? {} as Partial<UserModel>

    this.state = {
      login: user.login || "",
      email: user.email || "",
      first_name: user.first_name || "",
      second_name: user.second_name || "",
      display_name: user.display_name || "",
      phone: user.phone || "",
    };

    if (!user) {
      return;
    }

    this.childrens.backDiv = new BackDiv({
      onClick: () => {
        window.router.back()
      }
    })

    Object.entries(user)
      .filter(([key]) => key !== "id")
      .forEach(([key, value]) => {
        this.childrens[`userFields ${key}`] = new ProfileEditCell({
          label: key || "",
          input: new InputField({
            name: key,
            placeholder: `Введите ${key}`,
            value: value === null ? "" : String(value),
            error: "",
            inputClasses: "text-right ml-auto",
            parentClasses: "",
            onChange: (e: Event) => {
              const input = e.target as HTMLInputElement;
              const validationErrors = Validator.validate({ [key]: input.value }, this.fieldLabels);
              const fieldErrors = validationErrors[key] || [];
              this.childrens[`userFields ${key}`].setProps({ error: fieldErrors, value: input.value })
              this.setState((prevState) => ({
                ...prevState,
                [key]: input.value
              }))
            },
          })
        });

      });
    this.childrens.resultButton = new Button({
      label: "Поменять",
      name: "save",
      type: "button",
      className: "button w-100 mt-2",
      onClick: () => {
        this.handleSave()
      }
    });

    this.childrens.avatar = new Avatar({
      user_src: CONSTATNS.BASE_SOURCES_URL+window.store.getState().user?.avatar || 'img/avatar_mock.jpg',
      className: 'avatar cursor-pointer mb-2',
      width: 130,
      onClick: () => { window.store.set({ openedModal: 'uploadAvatar' }) }
    })

    this.childrens.modal = new Modal({
      title: 'Загрузка нового аватара',
      content: 'Аватар',
      onOkClock: () => { console.log(123) }
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
      authServices.editProfile(this.state)
    } else {
      console.log("Форма содержит ошибки:", validationErrors);
    }
  }

  render() {
    return this.compile(template, {...this.props})
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  openedModal: state.openedModal,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(ProfileEdit));
