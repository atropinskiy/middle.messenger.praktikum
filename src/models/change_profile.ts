export interface ChangeProfileModel {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  chat_name: string;
  phone: string;
  avatar_url: string;
  [key: string]: string | undefined;
}
