// lib/api/auth/signup.ts

import { apiFetch } from './index';

type SignupPayload = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  endereco: string;
  cnpj?: string;
  type: 'adotante' | 'ong';
};

export async function signup(payload: SignupPayload) {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
