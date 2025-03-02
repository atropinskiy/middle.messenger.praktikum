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
    return 'Логин может содержать только латиницу';
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

// Главный валидатор
export class Validator {
  static validate(fields: Record<string, string>, fieldLabels: UserModel): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    Object.entries(fields).forEach(([key, value]) => {
      const label = fieldLabels[key];
      if (!label) return;

      let fieldErrors: string[] = [];

      switch (key) {
        case 'email':
          if (!Validator.validateEmail(value)) {
            fieldErrors.push(`${label} должен быть валидным email.`);
          }
          break;
        case 'login': {
          const error = validateLogin(value);
          if (error) fieldErrors.push(error);
          break;
        }
        case 'password': {
          const error = validatePassword(value);
          if (error) fieldErrors.push(error);
          break;
        }
        case 'phone':
          if (!Validator.validatePhone(value)) {
            fieldErrors.push(`${label} должен быть валидным номером телефона.`);
          }
          break;
        default:
          if (value.trim() === '') {
            fieldErrors.push(`${label} не может быть пустым.`);
          }
      }

      if (fieldErrors.length > 0) {
        errors[key] = fieldErrors; // Сохраняем ошибки для каждого поля отдельно
      }
    });

    return errors;
  }

  // Валидация email
  static validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Валидация телефона
  static validatePhone(phone: string): boolean {
    const regex = /^\+?\d{1,4}?[\s-]?\(?\d{1,3}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    return regex.test(phone);
  }
}
