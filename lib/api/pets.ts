// lib/api/pets.ts
import { makeAuthethicatedApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getPets() {
  const response = await makeAuthethicatedApiCall({
    endpoint: "/pets",
    options: {
      method: "GET",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.body.message);
  }

  return response.body;
}

export async function getPetByOng(org: number) {
  const response = await makeAuthethicatedApiCall({
    endpoint: `/pets/ong/${org}`,
    options: {
      method: "GET",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.body.message);
  }

  return response.body;
}

export async function getPetById(id: string) {
  const response = await makeAuthethicatedApiCall({
    endpoint: `/pets/${id}`,
    options: {
      method: "GET",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.body.message);
  }

  return response.body;
}