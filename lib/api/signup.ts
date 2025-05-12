import { apiFetch } from './index';

type CommonPayload = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
};

type AdotantePayload = CommonPayload & {
  tipo_usuario: ['adotante'];
};

type OngPayload = CommonPayload & {
  tipo_usuario: ['ong'];
  ong_info: {
    nome_ong: string;
    cnpj: string;
    telefone_ong: string;
    endereco: {
      rua: string;
      numero: number;
      cidade: string;
      estado: string;
    };
    pets: [];
  };
};

export type SignupPayload = AdotantePayload | OngPayload;

export async function signup(payload: SignupPayload) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
