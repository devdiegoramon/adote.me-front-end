// lib/api/pets.ts
import { apiFetch } from './index';

export async function getPets() {
  return apiFetch("/pets"); // Faz GET /pets
}

export async function getPetById(id: string) {
  return apiFetch(`/pets/${id}`); // Faz GET /pets/:id
}