export interface RegisterModel {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone:string
  password: string;
  password_confirm: string;
  isFormValid?: boolean;
}
