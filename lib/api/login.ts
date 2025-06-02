// lib/api/auth/login.ts
import { makeApiCall } from "./index";
import { apiFetch } from './index';

type LoginPayload = {
  email: string;
  senha: string;
};

export async function login(payload: LoginPayload) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  // const response = await makeApiCall({
  //   endpoint: "/auth/login",
  //   options: {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   },
  });

//   if (response.status !== 200) {
//     throw new Error(response.body.message);
//   }

//   return response.body;
// }
}