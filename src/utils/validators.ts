import { UserModel } from "@models/chat";

// Валидация поля логин
export const validateLogin = (value: string): string | null => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Поле не может быть пустым';
  }
  if (trimmedValue.length < 3 || trimmedValue.length > 20) {
    return 'Логин должен содержать от 3 до 20 символов';
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmedValue)) {
    return 'Логин может содержать только латиницу, дефис и нижнее подчеркивание';
  }
  if (/^\d+$/.test(trimmedValue)) {
    return 'Логин не может состоять только из цифр';
  }

  return null;
};

// Валидация пароля
export const validatePassword = (value: string): string | null => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Поле не может быть пустым';
  }
  if (trimmedValue.length < 8 || trimmedValue.length > 40) {
    return 'Пароль должен содержать от 8 до 40 символов';
  }
  if (!/[A-Z]/.test(trimmedValue)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!/\d/.test(trimmedValue)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  return null;
};

// Валидация совпадения паролей
export const validatePasswordConfirm = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) {
    return 'Пароли не совпадают';
  }
  return null;
};

// Валидация имени (first_name и second_name)
export const validateName = (value: string, field: string): string | null => {
  const trimmedValue = value.trim();
  if (!/^[A-Za-zА-Яа-яЁё]+([-]?[A-Za-zА-Яа-яЁё]+)?$/.test(trimmedValue)) {
    return `${field} должен содержать только латиницу или кириллицу, первая буква заглавная, без цифр и спецсимволов (кроме дефиса).`;
  }
  return null;
};

// Валидация email
export const validateEmail = (value: string): string | null => {
  const trimmedValue = value.trim();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(trimmedValue)) {
    return 'Email должен быть валидным.';
  }
  return null;
};

// Валидация телефона
export const validatePhone = (value: string): string | null => {
  const trimmedValue = value.trim();
  const regex = /^\+?\d{10,15}$/;
  if (!regex.test(trimmedValue)) {
    return 'Номер телефона должен содержать от 10 до 15 цифр и может начинаться с плюса.';
  }
  return null;
};

// Валидация сообщения (message)
export const validateMessage = (value: string): string | null => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Сообщение не может быть пустым.';
  }
  return null;
};

// Главный валидатор
export class Validator {
  static validate(fields: Record<string, string>, fieldLabels: UserModel): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    Object.entries(fields).forEach(([key, value]) => {
      const label = fieldLabels[key];
      if (!label) return;

      const fieldErrors: string[] = [];

      switch (key) {
        case 'email': {
          const emailError = validateEmail(value);
          if (emailError) fieldErrors.push(emailError);
          break;
        }
        case 'login': {
          const loginError = validateLogin(value);
          if (loginError) fieldErrors.push(loginError);
          break;
        }
        case 'password': {
          const passwordError = validatePassword(value);
          if (passwordError) fieldErrors.push(passwordError);
          break;
        }
        case 'password_confirm': {
          const passwordConfirmError = validatePasswordConfirm(fields['password'], value);
          if (passwordConfirmError) fieldErrors.push(passwordConfirmError);
          break;
        }
        case 'first_name':
        case 'second_name': {
          const nameError = validateName(value, key === 'first_name' ? 'Имя' : 'Фамилия');
          if (nameError) fieldErrors.push(nameError);
          break;
        }
        case 'phone': {
          const phoneError = validatePhone(value);
          if (phoneError) fieldErrors.push(phoneError);
          break;
        }
        case 'message': {
          const messageError = validateMessage(value);
          if (messageError) fieldErrors.push(messageError);
          break;
        }
        default: {
          if (value.trim() === '') {
            fieldErrors.push(`${label} не может быть пустым.`);
          }
        }
      }


      if (fieldErrors.length > 0) {
        errors[key] = fieldErrors;
      }
    });

    return errors;
  }
}
