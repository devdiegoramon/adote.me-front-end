// lib/api/index.ts
import { Platform } from 'react-native';
const localIP = "192.168.1.8"; // <- Substitua pelo IP do seu PC na rede local

export const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : `http://${localIP}:3000`;
    
// import request_json_body from "./interceptors/request_json_body";
import response_json_body from "./interceptors/response_json_body";

export type Interceptor = {
  onRequest?: (options: RequestInit) => Promise<RequestInit> | undefined;
  onResponse?: (
    response: Response,
    retryCB: () => Promise<any>
  ) => Promise<any> | undefined;
};

type ApiCallOptions = {
  endpoint: string;
  interceptors?: Interceptor[] | undefined;
  options: RequestInit;
};


export async function apiFetch(path: string, options: RequestInit = {}) {
  console.log(API_BASE_URL)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData && "Erro na requisição");
  }

  return response.json();
}

export async function makeApiCall(options: ApiCallOptions): Promise<any> {
  const initialOptions = { ...options.options };

  if (!options.interceptors || !Array.isArray(options.interceptors)) {
    options.interceptors = [];
  }

  for (const interceptor of [...options.interceptors]) {
    if (typeof interceptor.onRequest !== "function") {
      continue;
    }

    options.options = await interceptor.onRequest(options.options)!;
  }

  var response = await apiFetch(options.endpoint, options.options);

  for (const interceptor of [...options.interceptors.reverse(), response_json_body]) {
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
