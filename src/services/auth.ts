import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";
import { LoginRequestData, APIError, CreateUser } from "api/type";

const authApi = new AuthApi();

export const loggedIn = () => {
  const store = window.store.getState()
  return store.user || null;
};

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

export const me = async (): Promise<void> => {
  window.store.set({ isLoading: true });
  try {
    const response = await authApi.me();

    if ('id' in response && 'login' in response) {
      window.store.set({ user: response });
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
  window.store.set({ isLoading: true });

  try {
    const response = await authApi.logout(); // Получаем ответ от logout

    // Проверяем, что response существует и имеет статус
    if (response && 'status' in response) {
      if (response.status === 200) {
        window.store.set({ user: null });
        console.log(window.store.getState())
      } else if (response.status === 500) {
        // Ошибка сервера
        console.error("Unexpected error from the server");
        window.store.set({ loginError: "Unexpected error occurred" });
      } else {
        // Обработка других кодов состояния
        console.error(`Unexpected response status: ${response.status}`);
        window.store.set({ loginError: `Error ${response.status}` });
      }
    } else {
      // Если нет response или status
      console.error('No response or response format is incorrect');
      window.store.set({ loginError: "Unexpected response format" });
    }

  } catch (error: unknown) {
    if (error instanceof Response) {
      // Если ошибка — это ответ с ошибкой от API
      const errorData: APIError = await error.json();
      window.store.set({ loginError: errorData.reason });
    } else {
      // Обработка других типов ошибок (например, сетевых ошибок)
      console.error("Unexpected error:", error);
      window.store.set({ loginError: "Unexpected error occurred" });
    }
  } finally {
    // Завершаем процесс загрузки
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
