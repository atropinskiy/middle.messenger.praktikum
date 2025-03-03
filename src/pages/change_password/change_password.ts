import Block from "@core/block";
import template from "./change_password.hbs?raw";
import { Input, Avatar, Button } from "@components/index"

export class PasswordChange extends Block {
  constructor() {
    super();


  }

  protected initChildren() {
    this.childrens.oldPasswordInput = new Input({
      name: 'oldPassword',
      placeholder: 'Старый пароль',
      className: "profile-input",
      type: 'password'
    })
    this.childrens.newPasswordInput = new Input({
      name: 'newPassword',
      placeholder: 'Новый пароль',
      className: "profile-input",
      type: 'password'
    })
    this.childrens.confirmPasswordInput = new Input({
      name: 'confirmPassword',
      placeholder: 'Подтверждение пароля',
      className: "profile-input",
      type: 'password'
    })
    this.childrens.avatar = new Avatar({
      src: 'img/avatar_mock.jpg',
      className: 'avatar mb-2',
      width: 130
    })
    this.childrens.resultButton = new Button({
      label: "Сохранить",
      name: "save",
      type: "button",
      className: "button w-100 mt-2",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
