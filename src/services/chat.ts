import SocketConnection from "@core/SocketConnection";
import ChatApi from "../api/chat";
import { APIError, IChatItem, IToken, SignUpResponse, TChatUser, UserDTO } from "api/type";
import ProfileApi from "../api/profile";

const chatApi = new ChatApi();
const profileApi = new ProfileApi();

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

export const addUserToChat = async (userId: number): Promise<string | APIError> => {
  window.store.set({ isLoading: true });
  const chat = window.store.getState().currentChatId
  try {
    const response = await chatApi.addUserToChat(userId, chat)
    window.store.set({ openedModal: false })
    getChatUsers()
    return response
  } catch (error) {
    return { reason: "Неизвестная ошибка" } as APIError;
  } finally {
    window.store.set({ isLoading: false });
  }
}

export const delUserFromChat = async (userId: number): Promise<string | APIError> => {
  window.store.set({ isLoading: true });
  const currentChatId = window.store.getState().currentChatId
  getChatUsers()
  try {
    const response = chatApi.delUserFromChat(userId, currentChatId)
    getChatUsers()
    return response
  } catch {
    return { reason: "Ошибка" } as APIError;
  } finally {
    window.store.set({ isLoading: false });
  }

}

export const getChatUsers = async (): Promise<TChatUser[] | string> => {
  window.store.set({ isLoading: true });
  const chat = window.store.getState().currentChatId
  try {
    const response = await chatApi.getChatUsers(chat, { limit: 5, offset: 0 })

    if (typeof response === "string") {
      console.error(response);
      return response;
    }

    window.store.set({ currentChatUsers: response })
    return response
  } catch {
    return "Неизвестная ошибка";
  } finally {
    window.store.set({ isLoading: false });
  }
}

export const searchUsersByLogin = async (login: string): Promise<UserDTO[] | APIError | string> => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.searchUsersByLogin(login)
    if (Array.isArray(response) && response.every(user => 'id' in user && 'login' in user)) {
      window.store.set({ searchUsers: response });
    }
    return response
  } catch {
    return "Ошибка"
  } finally {
    window.store.set({ isLoading: false })
  }
}

export const uploadFile = async (file: File): Promise<UserDTO | string> => {
  window.store.set({ isLoading: true });

  const formData = new FormData();
  formData.append("avatar", file); // Передаем "avatar"

  try {
    const response = await profileApi.uploadAvatar(formData);

    if (typeof response === 'object' && response !== null && 'id' in response && 'avatar' in response) {
      window.store.set({ user: response });
      window.store.set({ openedModal: false })
      return response;
    } else {
      return "Ошибка: Неверный формат ответа от сервера";
    }
  } catch (error) {
    console.error("Ошибка при загрузке файла", error); // Логируем ошибку для отладки
    return "Ошибка при загрузке файла";
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
