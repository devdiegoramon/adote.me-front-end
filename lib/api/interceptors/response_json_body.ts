import { Interceptor } from "..";

export default {
  onResponse: async (response: Response, _) => {
    return { body: await response.json(), status: response.status } as any; 
  },
} as Interceptor;
