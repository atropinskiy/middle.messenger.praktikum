import Block from "@core/block";
import template from "./change_password.hbs?raw";
import { Input, Avatar, Button, BackDiv } from "@components/index"
import { changePassword } from "../../services/chat";

interface PasswordChangeState {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export class PasswordChange extends Block<{}, PasswordChangeState> {
  constructor() {
    super();
  }

  protected initChildren() {
    this.childrens.avatar = new Avatar({
      src: 'img/avatar_mock.jpg',
      className: 'avatar mb-2',
      width: 130
    })

    this.childrens.oldPasswordInput = new Input({
      name: 'oldPassword',
      placeholder: 'Старый пароль',
      className: "profile-input",
      type: 'password',
      onChange: (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.setState((prevState) => ({
          ...prevState,
          oldPassword: input.value
        }))
      }
    })

    this.childrens.newPasswordInput = new Input({
      name: 'newPassword',
      placeholder: 'Новый пароль',
      className: "profile-input",
      type: 'password',
      onChange: (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.setState((prevState) => ({
          ...prevState,
          newPassword: input.value
        }))
      }
    })

    this.childrens.confirmPasswordInput = new Input({
      name: 'confirmPassword',
      placeholder: 'Подтверждение пароля',
      className: "profile-input",
      type: 'password',
      onChange: (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.setState((prevState) => ({
          ...prevState,
          confirmPassword: input.value
        }))
      }
    })


    this.childrens.backDiv = new BackDiv({
      onClick: () => {
        window.router.back()
      }
    })
    

    this.childrens.resultButton = new Button({
      label: "Сохранить",
      name: "save",
      type: "button",
      className: "button w-100 mt-2",
      onClick: () => {
        const oldPassword = this.state.oldPassword
        const newPassword = this.state.newPassword
        const confirmPassword = this.state.confirmPassword

        if (
          oldPassword !== newPassword &&
          newPassword === confirmPassword
        ) {changePassword(oldPassword, newPassword)}

        
        console.log(oldPassword, newPassword, confirmPassword)
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
