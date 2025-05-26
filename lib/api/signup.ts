import { apiFetch } from './index';

type CommonPayload = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: 'ONG' | 'adotante';
};

type AdotantePayload = CommonPayload & {
  tipo: 'adotante';
  preferencias?: string[]; // conforme novo model
};

type OngPayload = CommonPayload & {
  tipo: 'ONG';
  cnpj: string;
  endereco: {
    logradouro: string;
    bairro: string;
  };
  cidade: string;
  estado: string;
  // Caso queira manter campos extras opcionalmente:
  telefone_contato?: string;
  whatsapp?: string;
  cep?: string;
  coordenadas?: [number, number];
  imagem_url?: string;
  redes_sociais?: {
    instagram?: string;
    facebook?: string;
    site?: string;
  };
};

export type SignupPayload = AdotantePayload | OngPayload;

export async function signup(payload: SignupPayload) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
