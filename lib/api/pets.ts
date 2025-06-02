// lib/api/pets.ts
import { makeApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getPets() {
  const response = await makeApiCall({
    endpoint: "/pets",
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.body.message);
  }

  return response.body;
}

export async function getPetByOrg(org: number) {
  const response = await makeApiCall({
    endpoint: `/pets/org/${org}`,
    interceptors: [authorization],
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
  const response = await makeApiCall({
    endpoint: `/pets/${id}`,
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.body.message);
  }

  return response.body;
}