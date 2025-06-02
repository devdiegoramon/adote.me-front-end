// lib/api/pets.ts
import { makeApiCall } from "./index";
import authorization from "./interceptors/authorization";

export async function getLoggedProfile() {
  return makeApiCall({
    endpoint: "/users/me",
    interceptors: [authorization],
    options: {
      method: "GET",
    },
  });
}