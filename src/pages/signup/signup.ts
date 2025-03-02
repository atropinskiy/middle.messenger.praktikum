import Block from '@core/block';
import template from './signup.hbs?raw';
import { Button, InputField } from '@components/index';
import { UserModel } from '@models/chat';
import { Validator } from '@utils/validators';

const fields: UserModel = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  password_confirm: ''
};

export default class SignUp extends Block<Record<string, unknown>, UserModel> {
  private fieldLabels: UserModel = {
    email: 'Email',
    login: 'Логин',
    first_name: 'Имя',
    second_name: 'Фамилия',
    phone: 'Телефон',
    password: 'Пароль',
    password_confirm: 'Подтверждение пароля',
  };

  constructor() {
    super();
    this.state = { ...fields };
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

    this.childrens.submitButton = new Button({
      label: 'Sign Up',
      name: 'submit',
      type: 'button',
      className: 'button w-100 signup-button',
      onClick: () => this.handleSubmit(),
    });
  }

  private handleInputChange(e: Event, name: string) {
    const input = e.target as HTMLInputElement;
    const { value } = input;

    this.setState({
      [name]: value,
    });

    if (name === 'password') {
      if (this.state.password_confirm && this.state.password_confirm !== value) {
        this.childrens.password_confirm?.setProps({
          error: 'Пароли не совпадают',
        });
      } else {
        this.childrens.password_confirm?.setProps({
          error: '',
        });
      }
    }

    if (name === 'password_confirm') {
      if (this.state.password && this.state.password !== value) {
        this.childrens.password_confirm?.setProps({
          error: 'Пароли не совпадают',
        });
      } else {
        this.childrens.password_confirm?.setProps({
          error: '',
        });
      }
    }

    const fieldErrors = this.validateField(name, value);

    this.childrens[name]?.setProps({ error: fieldErrors.join(', ') });
  }

  private validateField(name: string, value: string) {
    const errors = Validator.validate({ [name]: value }, this.fieldLabels);
    const fieldErrors = errors[name] || [];

    if (name === 'password_confirm') {
      if (this.state.password && this.state.password !== value) {
        fieldErrors.push('Пароли не совпадают');
      } else if (this.state.password === value) {
        fieldErrors.length = 0;
      }
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
      const errorMessage = errorMessages.join(', ');
      inputField.setProps({ error: errorMessage }); 
    });

    return errors;
  }

  private handleSubmit() {
    const sanitizedState = Object.fromEntries(
      Object.entries(this.state).map(([key, value]) => [key, value ?? ''])
    );

    const errors = this.validateFields();

    if (Object.values(errors).some((errorMessages) => errorMessages.length > 0)) {
      console.log("Ошибки при отправке формы:", errors);

    } else {
      console.log("Форма успешно отправлена:", sanitizedState);
    }
  }

  render() {
    return this.compile(template, {});
  }
}
