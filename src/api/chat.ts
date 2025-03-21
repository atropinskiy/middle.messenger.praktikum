import { HTTPTransport } from "../core/httpTransport";

const chatsApi = new HTTPTransport("/chats");

export default class ChatApi {
  async getChats<T=unknown>(data: TChat): Promise<T> {
    return chatsApi.get("/chats", {data})
  }
}
