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
    this.apiUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  get<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.GET,
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
