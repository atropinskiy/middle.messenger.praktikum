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

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
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

export interface IToken {
  token: string
}

export interface IChatMessage {
  chat_id: "number",
  time: "string",
  type: "string",
  user_id: "string",
  content: "string",
  file?: {
    id: "number",
    user_id: "number",
    path: "string",
    filename: "string",
    content_type: "string",
    content_size: "number",
    upload_date: "string",
  }
}

export interface IAddUser {
  users: number[]
  chatId: number
}

export type TChatUser = Omit<UserDTO, 'phone' | 'email'> & {
  role: string
}

export interface IFileRequest {
  id: number
  user_id: number
  path: string,
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}
