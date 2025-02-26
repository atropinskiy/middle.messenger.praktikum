import { Button } from "../../components";
import Block from "../../core/block";

interface LoginPageProps {
  className?: string;
  SignInButton?: Button;
  SignUpButton?: Button;
}

export default class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super("div", {
      ...props,
      className: "container",
      SignInButton: new Button({
        label: "Sign in",
        type: "button", // Убедитесь, что это 'button', а не 'submit'
        onClick: (e) => {
          e.preventDefault();
          console.log("Клик по кнопке Sign in");
        },
      }),
      SignUpButton: new Button({
        label: "Sign up",
        type: "button", // Убедитесь, что это 'button', а не 'submit'
        onClick: (e) => {
          e.preventDefault();
          console.log("Клик по кнопке Sign up");
        },
      }),
    });
  }

  public render(): string {
    return `
      <form class="login-form">
        {{{ SignInButton }}}
        {{{ SignUpButton }}}
      </form>
    `;
  }
}
