// lib/api/index.ts

// import request_json_body from "./interceptors/request_json_body";
import authorization from "./interceptors/authorization";
import refresh_token from "./interceptors/refresh_token";
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

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.6:3000/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  return { body: await response.json(), status: response.status } as any;
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

  for (const interceptor of [...options.interceptors.reverse()]) {
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

export async function makeAuthethicatedApiCall(
  options: ApiCallOptions,
): Promise<any> {
  if (!options.interceptors) {
    options.interceptors = [];
  }

  options.interceptors.push(authorization, refresh_token);

  return makeApiCall(options);
}
