// lib/api/index.ts

export type Interceptor = {
  onRequest: (options: RequestInit) => Promise<RequestInit> | undefined;
  onResponse: (
    response: Response,
    retryCB: () => Promise<any>
  ) => Promise<any> | undefined;
};

type ApiCallOptions = {
  endpoint: string;
  interceptors: Interceptor[];
  options: RequestInit;
};

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.104:3000/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return response.json();
}

export async function makeApiCall(options: ApiCallOptions): Promise<any> {
  const initialOptions = { ...options.options };

  for (const interceptor of options.interceptors) {
    if (typeof interceptor.onRequest !== "function") {
      continue;
    }

    options.options = await interceptor.onRequest(options.options)!;
  }

  var response = await apiFetch(options.endpoint, options.options);

  for (const interceptor of options.interceptors.reverse()) {
    if (typeof interceptor.onResponse !== "function") {
      continue;
    }

    response = await interceptor.onResponse(response, () =>
      makeApiCall({
        endpoint: options.endpoint,
        interceptors: options.interceptors,
        options: initialOptions,
      })
    )!;
  }

  return response;
}
