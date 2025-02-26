import Block from "../../core/block";
import Handlebars from "handlebars";
import template from "./signin.hbs?raw";
import { Button } from "@components/index";

interface LoginPageProps {
  formState?: {
    login: string;
    password: string;
  };
  errors?: {
    login: string;
    password: string;
  };
  className?: string;
  button?: string;
}

export default class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps = {}) {
    const button = new Button({
      label: "Войти",
      className: "123",
      onClick: (e) => {
        e.preventDefault();
        console.log("Клик по кнопке Войти");
      },
    });
    
    console.log("Созданная кнопка:", button); // 🔍 Проверяем объект кнопки
    console.log("Код кнопки после render():", button.render()); // 🔍 Проверяем разметку кнопки
    

    super("div", {
      ...props,
      formState: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      className: "container",
      button: button.render(),
    });
    console.log("this.props после super:", this.props);
  }

  public render(): string {
    console.log("Передаем в шаблон:", this.props);
  
    return Handlebars.compile(template)({
      ...this.props,
      button: this.props.button
    });

    
  }

  

}
