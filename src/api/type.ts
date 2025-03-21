export type APIError = {
  reason: string;
};

export type SignUpResponse = {
  id: number
}

export type UserDTO = {
  id?: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar?: string;
  phone: string;
  email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
  password: string
}

export type CreateChat = {
  title: string
}

export type LoginRequestData = {
  login: string,
  password: string
}

type LastMessage = {
  user: UserDTO,
  time: string,
  content: string
}

export type ChatDTO = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: LastMessage | null
}

// ChatTypes

export interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: ILastMessage;
}

export interface IChatCreate {
  title: string;
}

export interface IChatUsersRequest {
  users: number[];
  chatId: number;
}

export interface ILastMessage {
  user: UserDTO;
  time: string;
  content: string;
}
