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
