// lib/api/pets.ts
import { makeApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getLoggedProfile() {
  const response = await makeApiCall({
    endpoint: "/users/me",
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });

  if (response.status != 200) {
    throw new Error("Falha ao buscar perfil do usuário.");
  }

  return response.body;
}
