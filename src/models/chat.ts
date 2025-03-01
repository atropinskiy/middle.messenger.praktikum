export interface UserModel {
  login: string;
  avatar_url: string;
  email?: string;
  first_name?: string;
  second_name?: string;
  chat_name?: string;
  phone?: string;
}

export interface MessageModel {
  dateTime: Date;
  from: UserModel;
  to: UserModel;
  message: string;
}

export interface ChatModel {
  id: string;
  participants: UserModel[];
  messages: MessageModel[];
}
