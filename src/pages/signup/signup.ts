import Block from '@core/block';
import template from './signup.hbs?raw';
import { Button, InputField } from '@components/index';
import { UserModel } from '@models/chat';

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
  constructor() {
    super();

    // Инициализация состояния значениями из fields
    this.state = { ...fields };
    this.initChildren(); // Вызываем initChildren для инициализации полей формы
  }

  protected initChildren() {
    // Перебираем поля в состоянии и создаем компоненты InputField
    Object.entries(this.state).forEach(([name, value]) => {
      // Задаем типы по умолчанию
      let type = 'text';
      if (name === 'password' || name === 'password_confirm') {
        type = 'password';
      } else if (name === 'email') {
        type = 'email';
      } else if (name === 'phone') {
        type = 'tel';
      }

      // Инициализация компонента InputField для каждого поля
      this.childrens[name] = new InputField({
        error: '',
        name,
        type,
        value: value ?? '',  // Значение из состояния или пустая строка
        placeholder: `Enter ${name}`,
        parentClasses: 'mt-2',
        onChange: (e: Event) => this.handleInputChange(e, name), // Обработчик изменения
      });
    });

    // Добавление кнопки submit в форму
    this.childrens.submitButton = new Button({
      label: 'Sign Up',
      name: 'submit',
      type: 'button',
      className: 'button w-100 signup-button ',
      onClick: () => this.handleSubmit(),
    });
  }

  private handleInputChange(e: Event, name: string) {
    const input = e.target as HTMLInputElement;
    const { value } = input;
    
    // Обновляем состояние при изменении значения в инпуте
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }

  private handleSubmit() {
    // Логика отправки формы
    console.log("Form submitted with state:", this.state);
  }

  render() {
    // Рендерим шаблон
    return this.compile(template, {
      // передаем данные для рендеринга
    });
  }
}
