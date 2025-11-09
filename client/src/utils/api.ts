export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const BaseApi = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const { method = "GET", body, headers = {} } = options;
    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    return {
      success: res.ok,
      message: data?.message || (res.ok ? "Success" : "Error"),
      data: data?.data ?? data,
    };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message,
      data: undefined,
    };
  }
};
