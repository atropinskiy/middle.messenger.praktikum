import { HTTPTransport } from "../core/httpTransport";
import { APIError, IChatCreate, IChatItem, IToken, SignUpResponse } from "./type";
// import { CreateChat } from "./type";

const chatsApi = new HTTPTransport("/chats");

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
}
