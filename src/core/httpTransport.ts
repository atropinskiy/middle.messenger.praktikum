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
};

type OptionsWithoutMethod = Omit<Options, "method">;

export class HTTPTransport {
  private apiUrl: string = "";
  constructor(apiPath: string) {
    this.apiUrl = `${CONSTATNS.BASE_URL}${apiPath}`;
  }

  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    let fullUrl = `${this.apiUrl}${url}`;
  
    // Если переданы параметры (options.data), добавляем их в query string
    if (options.data) {
      const params = new URLSearchParams(options.data as Record<string, string>).toString();
      fullUrl += `?${params}`;
    }
  
    return this.request<TResponse>(fullUrl, {
      ...options,
      method: METHOD.GET,
      data: undefined, // Убираем data, т.к. fetch() не поддерживает body в GET
    });
  }
  

  post<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  put<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PUT,
    });
  }
  

  async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { method, data } = options;
    const response = await fetch(url, {
      method,
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });
  
    if (!response.ok) {
      throw response;
    }
  
    const contentType = response.headers.get("content-type");
    let resultData: TResponse;
  
    if (contentType?.includes("application/json")) {
      // Если это JSON, парсим как JSON
      resultData = await response.json();
    } else {
      // Если это не JSON, обрабатываем как строку
      resultData = await response.text() as unknown as TResponse;
    }
  
    return resultData;
  }
}
