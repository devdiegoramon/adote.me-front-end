// lib/api/pets.ts
import { makeApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getPets() {
  return makeApiCall({
    endpoint: "/pets",
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });
}

export async function getPetById(id: string) {
  return makeApiCall({
    endpoint: `/pets/${id}`,
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });
}
