import Button from '@components/button';
import Block from '@core/block';

interface SignInProps {
  // Здесь можно добавить другие свойства, если необходимо
}

class SignIn extends Block<SignInProps> {
  protected render(): string {
    return `
      <div>
        <h1>Sign In</h1>
        <div class="button-container">
          ${new Button({
            text: 'Sign In', // Текст кнопки
            buttonClass: 'btn-signin', // Класс для кнопки
            onClick: () => this.handleSignInClick(), // Обработчик события click
          }).getContent().outerHTML}
        </div>
      </div>
    `;
  }

  handleSignInClick() {
    alert('Sign In clicked!');
  }
}

export default SignIn;
