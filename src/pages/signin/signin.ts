import Block from "@core/block";

interface SignInProps {}

export default class SignIn extends Block<SignInProps> {
  static componentName = "SignIn";

  constructor(props: SignInProps) {
    super({
      ...props,
      onLoginClick: () => console.log("Кнопка нажата!"),
    });
  }

  render() {
    return `
      <div class="signin">
        <h1>Вход</h1>
        {{{ Button label="Пукнуть" onClick=onLoginClick }}}
      </div>
    `;
  }
}
