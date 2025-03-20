import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";
import { LoginRequestData, APIError, CreateUser } from "api/type";

const authApi = new AuthApi();

export const loggedIn = () => {
  const store = window.store.getState()
  return store.isLogged || null;
};

export const login = async (model: LoginRequestData): Promise<void> => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.store.set({'isLogged': true})
    await me()
    window.router.go(ROUTER.chat);
  } catch (responsError: unknown) {
    if (responsError instanceof Response) {
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

export const me = async (): Promise<void> => {
  window.store.set({ isLoading: true });
  try {
    const response = await authApi.me();

    if ('id' in response && 'login' in response) {
      window.store.set({ user: response, isLogged: true });
    } else {
      console.error("Unexpected response format", response);
    }
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
}


export const logOut = async (): Promise<void> => {
  try {
    const response = await authApi.logout(); 

    // Логируем ответ, чтобы увидеть, что именно возвращает logout
    console.log("Ответ от logout:", response);

    // Проверяем, что response существует и это строка
    if (typeof response === 'string') {
      window.store.set({isLogged: false})
      window.router.go(ROUTER.signin);
      
    } else {
      // В случае ошибки или других значений
      console.error("Ошибка при выходе, неверный ответ:", response);
      window.store.set({ loginError: "Неизвестная ошибка при выходе" });
    }

  } catch (error: unknown) {
    // Обрабатываем другие ошибки (например, сетевые)
    console.error("Ошибка при выполнении запроса:", error);
    window.store.set({ loginError: "Ошибка при выполнении запроса" });
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
