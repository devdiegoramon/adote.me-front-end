// lib/api/pets.ts
import { apiFetch } from './index';
import { makeApiCall } from "./index";
import { makeAuthethicatedApiCall } from "./index";
import authorization from "./interceptors/authorization";
import { API_BASE_URL } from './index';
import { dataURLtoBlob } from '../../src/utils/dataURLtoBlob';

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface PetRegisterPayload {
  nome: string;
  especie: "CACHORRO" | "GATO" | "OUTRO";
  idade: number;
  porte: "PEQUENO" | "MEDIO" | "GRANDE";
  peso: number;
  descricao: string;
  ong_id: number;
  foto_url: string;
  vacinado: boolean;
  castrado: boolean;
  vermifugado: boolean;
  microchipado: boolean;
  sexo: "MACHO" | "FEMEA";
  raca_id: number;
  personalidades: number[];
  coordenadas: Coordenadas;
  cidade: string;
  estado: string;
  nivelEnergia: "BAIXO" | "MODERADO" | "ALTO";
  necessidades_especiais: string | null;
  imagens: string[];
}


export async function getPets() {
  return apiFetch("/api/pets"); // Faz GET /pets
}

export async function getPetById(id: string) {
  return apiFetch(`/api/pets/${id}`); // Faz GET /pets/:id
}

export async function getPetByOngId(id: string) {
  return apiFetch(`/api/pets/ong/${id}`);
}

export async function getSolicitacoesByOngId(id: string) {
  return apiFetch(`/api/users/solicitacoes/${id}`); 
}

export async function petRegister(payload: PetRegisterPayload) {
  return apiFetch("/api/pets", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function uploadImagemPet(petId: number, imagemUri: string) {
  const formData = new FormData();
  
  // Verificar se é data URL (base64) ou caminho de arquivo
  if (imagemUri.startsWith('data:')) {
    // Caso navegador - data URL base64
    const filename = `pet_${petId}_${Date.now()}.jpg`;
    const blob = dataURLtoBlob(imagemUri);
    formData.append("image", blob, filename);
  } else {
    // Caso mobile - caminho de arquivo
    const filename = imagemUri.split("/").pop() || `pet_${petId}_${Date.now()}.jpg`;
    const fileExtension = filename.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
    
    // Para React Native, usar o objeto com uri, type e name
    formData.append("image", {
      uri: imagemUri,
      type: mimeType,
      name: filename,
    } as any);
  }
  
  console.log('Tipo de imagem:', imagemUri.startsWith('data:') ? 'Base64' : 'File Path');
  console.log('URI/Path:', imagemUri);

  return fetch(`${API_BASE_URL}/api/pets/image/${petId}`, {
    method: "POST",
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
  // const response = await makeAuthethicatedApiCall({
  //   endpoint: `/pets/${id}`,
  //   options: {
  //     method: "GET",
  //   },
  });
}

// export async function getPets() {
//   const response = await makeAuthethicatedApiCall({
//     endpoint: "/pets",
//     options: {
//       method: "GET",
//     },
//   });

//   if (response.status !== 200) {
//     throw new Error(response.body.message);
//   }

//   return response.body;
// }

// export async function getPetByOrg(org: number) {
//   const response = await makeAuthethicatedApiCall({
//     endpoint: `/pets/org/${org}`,
//     options: {
//       method: "GET",
//     },
//   });
  
//   if (response.status !== 200) {
//     throw new Error(response.body.message);
//   }


// export async function getPetById(id: string) {
//   const response = await makeApiCall({
//     endpoint: `/pets/${id}`,
//     interceptors: [authorization],
//     options: {
//       method: "GET",
//     },
//   });

//   if (response.status !== 200) {
//     throw new Error(response.body.message);
//   }

//   return response.body;
// }
