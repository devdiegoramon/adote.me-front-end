// lib/api/index.ts
import { Platform } from 'react-native';
const localIP = "192.168.1.8"; // <- Substitua pelo IP do seu PC na rede local

export const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : `http://${localIP}:3000`;
    
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
