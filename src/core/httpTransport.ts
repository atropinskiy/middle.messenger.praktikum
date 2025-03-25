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

  postFile<TResponse>(url: string, file: File, fieldName: string = "file"): Promise<TResponse> {
    const formData = new FormData();
    formData.append(fieldName, file);

    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      method: METHOD.POST,
      data: formData, // Передаём FormData
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

    const fetchOptions: RequestInit = {
        method,
        credentials: "include",
        mode: "cors",
        headers: { ...headers }, // Инициализируем заголовки
    };

    if (data) {
        if (data instanceof FormData) {
            fetchOptions.body = data;
            // НЕ УСТАНАВЛИВАЕМ "Content-Type", браузер сам установит boundary
        } else {
            fetchOptions.body = JSON.stringify(data);
            fetchOptions.headers = {
                ...fetchOptions.headers, // Расширяем существующие заголовки
                "Content-Type": "application/json",
            };
        }
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        throw response;
    }

    const contentType = response.headers.get("content-type");
    let resultData: TResponse;

    if (contentType?.includes("application/json")) {
        resultData = await response.json();
    } else {
        resultData = await response.text() as unknown as TResponse;
    }

    return resultData;
}

}
