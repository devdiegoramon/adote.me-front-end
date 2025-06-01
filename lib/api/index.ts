// lib/api/index.ts

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
