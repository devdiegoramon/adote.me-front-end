// lib/api/auth/login.ts
import { apiFetch } from './index';

type LoginPayload = {
  email: string;
  senha: string;
};

export async function login(payload: LoginPayload) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
