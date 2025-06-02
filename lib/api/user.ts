// lib/api/pets.ts
import { makeAuthethicatedApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getLoggedProfile() {
  const response = await makeAuthethicatedApiCall({
    endpoint: "/users/me",
    options: {
      method: "GET",
    },
  });
  
  if (response.status != 200) {
    throw new Error("Falha ao buscar perfil do usuário.");
  }

  return response.body;
}
