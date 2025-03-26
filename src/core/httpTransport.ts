import { CONSTATNS } from "@utils/constants";

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, "method">;

export class HTTPTransport {
  private apiUrl: string = "";

  constructor(apiPath: string) {
    this.apiUrl = `${CONSTATNS.BASE_URL}${apiPath}`;
  }

  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    let fullUrl = `${this.apiUrl}${url}`;

    if (options.data) {
      const params = new URLSearchParams(options.data as Record<string, string>).toString();
      fullUrl += `?${params}`;
    }

    return this.request<TResponse>(fullUrl, {
      ...options,
      method: METHOD.GET,
      data: undefined,
    });
  }

  post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  putFile<TResponse>(url: string, data: FormData): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      method: METHOD.PUT,
      data,
    });
  }

  put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PUT,
    });
  }

  delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.DELETE,
    });
  }
  
  async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { method, data, headers = {} } = options;
  
    return new Promise<TResponse>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Собираем полный URL
      xhr.open(method, url, true);
      xhr.withCredentials = true; // То же самое, что и "credentials: 'include'"
  
      // Устанавливаем заголовки
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
  
      // Устанавливаем заголовок "Content-Type", если это JSON
      if (data && !(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }
  
      xhr.responseType = "json"; // Ожидаем JSON в ответе
  
      // Обработчики загрузки и ошибок
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response); // Если статус OK, возвращаем данные
        } else {
          reject(xhr); // Если ошибка, отклоняем промис
        }
      };
  
      xhr.onerror = () => reject(new Error("Ошибка сети"));
      xhr.ontimeout = () => reject(new Error("Превышено время ожидания запроса"));
  
      // Отправляем данные
      if (data instanceof FormData) {
        xhr.send(data); // Если это FormData, отправляем как есть
      } else if (data) {
        xhr.send(JSON.stringify(data)); // Если данные есть, отправляем их как JSON
      } else {
        xhr.send(); // Если данных нет, отправляем пустой запрос
      }
    });
  }
  


}
