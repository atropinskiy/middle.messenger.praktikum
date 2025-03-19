import Block from '@core/block';
import template from './signup.hbs?raw';
import { Button, InputField, ErrorLabel } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';
import * as authServices from "../../services/auth";
import { CreateUser } from 'api/type';
import { connect } from '@utils/connect';


const fields: UserModel = {
  email: 'vas@mail.ru',
  login: 'asd',
  first_name: 'asd',
  second_name: 'asd',
  phone: '+79251234567',
  password: 'Qq123123',
  password_confirm: 'Qq123123',
};

interface SignUpProps {
  router: TRouter;
  loginError: string;
  user: any;
}

class SignUp extends Block<SignUpProps, UserModel> {
  private fieldLabels: UserModel = {
    email: 'Email',
    login: 'Логин',
    first_name: 'Имя',
    second_name: 'Фамилия',
    phone: 'Телефон',
    password: 'Пароль',
    password_confirm: 'Подтверждение пароля',
    loginError: ''
  };

  constructor(props: SignUpProps) {
    super({ ...props });
    this.state = { ...fields };
    console.log("Текущий пользователь:", this.props.user);
  }

  protected initChildren() {
    Object.entries(fields).forEach(([name, value]) => {
      let type = 'text';
      if (name === 'password' || name === 'password_confirm') {
        type = 'password';
      } else if (name === 'email') {
        type = 'email';
      } else if (name === 'phone') {
        type = 'tel';
      }

      this.childrens[name] = new InputField({
        error: '',
        name,
        type,
        value: value ?? '',
        placeholder: `Введите ${name}`,
        parentClasses: 'mt-2 signin-login-input',
        onChange: (e: Event) => this.handleInputChange(e, name),
      });
    });

    this.childrens.errorLabel = new ErrorLabel({
      label: this.props.loginError
    });

    this.childrens.submitButton = new Button({
      label: 'Sign Up',
      name: 'submit',
      type: 'button',
      className: 'button w-100 signup-button mt-auto',
      onClick: () => this.handleSubmit(),
    });
  }

  

  private handleInputChange(e: Event, name: string) {
    const input = e.target as HTMLInputElement;
    const { value } = input;

    this.setState({
      [name]: value,
    });

    if (name === 'password' || name === 'password_confirm') {
      const error = this.state.password !== this.state.password_confirm ? 'Пароли не совпадают' : '';
      this.childrens.password_confirm?.setProps({ error });
    }

    const fieldErrors = this.validateField(name, value);
    this.childrens[name]?.setProps({ error: fieldErrors.join(', ') });
  }

  private validateField(name: string, value: string) {
    const errors = Validator.validate({ [name]: value }, this.fieldLabels);
    const fieldErrors = errors[name] || [];

    if (name === 'password_confirm' && this.state.password !== value) {
      fieldErrors.push('Пароли не совпадают');
    }

    return fieldErrors;
  }

  private validateFields() {
    const sanitizedState = Object.fromEntries(
      Object.entries(this.state).map(([key, value]) => [key, value ?? ''])
    );

    const errors = Validator.validate(sanitizedState as Record<string, string>, this.fieldLabels);

    Object.entries(errors).forEach(([key, errorMessages]) => {
      const inputField = this.childrens[key] as InputField;
      inputField.setProps({ error: errorMessages.join(', ') });
    });

    return errors;
  }

  private async handleSubmit() {
    const sanitizedState = Object.fromEntries(
      Object.entries(this.state).map(([key, value]) => [key, value ?? ''])
    );
  
    const errors = this.validateFields();
  
    if (Object.values(errors).some((errorMessages) => errorMessages.length > 0)) {
      console.log('Ошибка ввода');
    } else {
      const data: CreateUser = {
        email: sanitizedState.email,
        first_name: sanitizedState.first_name,
        login: sanitizedState.login,
        password: sanitizedState.password,
        phone: sanitizedState.phone,
        second_name: sanitizedState.second_name
      };
      authServices.create(data);
    }
  }

  
  

  render() {
    return this.compile(template, {});
  }
}

const mapStateToProps = (state: any) => ({
  loginError: state.loginError,
  user: state.user,
});

// Корректный экспорт с приведением типов
export default connect(mapStateToProps)(SignUp);

