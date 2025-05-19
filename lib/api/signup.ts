import { apiFetch } from './index';

type CommonPayload = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: 'ONG' | 'adotante'; // <- Alterado aqui
};

type AdotantePayload = CommonPayload & {
  tipo: 'adotante';
  preferencias?: string[]; // <- conforme novo model
};

type OngPayload = CommonPayload & {
  tipo: 'ONG';
  telefone_contato?: string;
  whatsapp?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  endereco?: string;
  coordenadas?: [number, number];
  cnpj?: string;
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
