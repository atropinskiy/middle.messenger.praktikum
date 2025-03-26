import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";
import ProfileApi from "../api/profile";
import { LoginRequestData, APIError, CreateUser, UserDTO } from "api/type";

const authApi = new AuthApi();
const profileApi = new ProfileApi();

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
      window.store.set({ user: response, isLogged: true, avatar: response.avatar });
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


export const logOut = async (): Promise<string> => {
  try {
    const response = await authApi.logout(); 
    console.log("Ответ от logout:", response);
    if (response == 'OK') {
      window.store.set({ isLogged: false });
      window.router.go(ROUTER.signin);
      return 'Ok';
    } else {
      console.error("Ошибка при выходе, неверный ответ:", response);
      window.store.set({ loginError: "Неизвестная ошибка при выходе" });
      return 'error';
    }
  } catch (error: unknown) {
    console.error("Ошибка при выполнении запроса:", error);
    window.store.set({ loginError: "Ошибка при выполнении запроса" });
    return 'error'; 
  } finally {
    window.store.set({ isLoading: false, isLogged: false });
    window.router.go(ROUTER.signin);
  }
};


export const editProfile = async (model: UserDTO): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    const response = await profileApi.profileEdit<UserDTO>(model);

    if (typeof response === "object" && response !== null && "id" in response && "login" in response) {
      window.store.set({ user: response as UserDTO, isLogged: true });
    } else {
      console.error("Unexpected response format", response);
    }
  } catch (responsError: unknown) {
    if (responsError instanceof Response) {
      const error: APIError = await responsError.json();
      window.store.set({ loginError: error.reason });
    } else {
      console.error("Unexpected error:", responsError);
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
