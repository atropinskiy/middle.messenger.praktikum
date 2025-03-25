import { HTTPTransport } from "../core/httpTransport";
import { APIError, IChatCreate, IChatItem, IToken, SignUpResponse, TChatUser, UserDTO } from "./type";
// import { CreateChat } from "./type";

const chatsApi = new HTTPTransport("/chats");
const userApi = new HTTPTransport("/user")

export default class ChatApi {
  async getChats(data: TChatResponseSettings): Promise<IChatItem[] | APIError> {
    return chatsApi.get("/", {data:{data}})
  }

  async createChat(data: IChatCreate): Promise<SignUpResponse | APIError> {
    return chatsApi.post("/", { data })
  }

  async getToken(chatId: string): Promise<IToken | APIError> {
    return chatsApi.post(`/token/${chatId}`)
  }

  async addUserToChat(userId: number, chatId: number): Promise<string | APIError> {
    return chatsApi.put('/users', {data: {users: [userId], chatId: chatId}})
  }

  async delUserFromChat(userId: number, chatId: number): Promise<string | APIError> {
    return chatsApi.delete('/users', {data: {users: [userId], chatId: chatId}})
  }

  async getChatUsers(chatId: number, data: {limit?: number, offset?: number}): Promise<TChatUser[] | string> {
    return chatsApi.get(`/${String(chatId)}/users`, {data: data})
  }

  async searchUsersByLogin(login: string): Promise<UserDTO[] | APIError | string> {
    return userApi.post('/search', {data: {login: login}})
  }

}
