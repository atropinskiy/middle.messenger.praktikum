import SocketConnection from "@core/SocketConnection";
import ChatApi from "../api/chat";
import { APIError, IChatItem, IToken, SignUpResponse } from "api/type";

const chatApi = new ChatApi();

export const getChats = async (): Promise<IChatItem[] | APIError> => {
  window.store.set({ isLoading: true });
  try {
    const chats = await chatApi.getChats({ limit: 5, offset: 0 })
    if ("reason" in chats) {
      console.error("Ошибка при загрузке чатов:", chats.reason);
      return chats; // Возвращаем APIError
    }

    window.store.set({ chats });
    return chats;
  } catch (error) {
    console.error("Ошибка при загрузке чатов:", error);
    return [];
  } finally {

  }
}

export const createChat = async (title: string): Promise<SignUpResponse | APIError> => {
  window.store.set({ isLoading: true });

  try {
    const response = await chatApi.createChat({ title: title });

    // Проверяем, является ли ответ ошибкой
    if ("reason" in response) {
      console.error("Ошибка при создании чата:", response.reason);
      return response;
    }

    console.log("Чат создан успешно:", response);
    return response;
  } catch (error) {
    console.error("Ошибка при создании чата:", error);
    return { reason: "Неизвестная ошибка" } as APIError;
  } finally {
    window.store.set({ isLoading: false });
  }
};


export class SocketService {
  private socket: SocketConnection | null

  constructor() {
    this.socket = null;
  }

  async setSocketConnection(userId: string, chatId: string): Promise<IToken | APIError> {
    window.store.set({ isLoading: true });

    try {
      const response = await chatApi.getToken(chatId);
      if ('token' in response) {
        const token: string = response.token
        const endpoint = `${userId}/${chatId}/${token}`;
        this.socket = new SocketConnection(endpoint)
      }
     

      return response;
    } catch (error) {
      console.error("Ошибка при получении токена:", error);
      return { reason: "Неизвестная ошибка" } as APIError;

    } finally {
      window.store.set({ isLoading: false });
    }
  };

  async sendMessage(message: string) {
    if (this.socket) {
      this.socket.sendMessage(message);
    }
  }
}
