import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";
import { LoginRequestData, APIError, UserDTO, CreateUser } from "api/type";

const authApi = new AuthApi();

export const login = async (model: LoginRequestData): Promise<void> => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.router.go(ROUTER.chat);
  } catch (responsError: unknown) {
    if (responsError instanceof Response) {
      // Проверяем, что responsError это объект типа Response
      const error: APIError = await responsError.json();
      window.store.set({ loginError: error.reason });
    } else {
      // Обработка других типов ошибок, если нужно
      console.error("Unexpected error:", responsError);
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const create = async (model: CreateUser): Promise<void> => {
  window.store.set({ isLoading: true });
  
  try {
    const response = await authApi.create(model);
    if (response && 'id' in response) {
      window.router.go(ROUTER.chat);  // Переходим на страницу чата
    } else {
      console.error('Unexpected response format:', response);
      window.store.set({ loginError: 'Неизвестная ошибка при регистрации' });
    }

  } catch (responsError: unknown) {
    if (responsError instanceof Response) {
      const error: APIError = await responsError.json();
      window.store.set({ loginError: error.reason });
      
    } else {
      console.error('Unexpected error:', responsError);
      window.store.set({ loginError: 'Неизвестная ошибка. Попробуйте позже.' });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};



// export const checkLoginUser = async () => {
//   window.store.set({ isLoading: true });
//   try {
//     const user = await authApi.me();
//     window.router.go(ROUTER.cats);
//     window.store.set({ user });
//   } catch (responsError) {
//     const error = await responsError.json();
//     window.store.set({ loginError: error.reason });
//   } finally {
//     window.store.set({ isLoading: false });
//   }
// };
