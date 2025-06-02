import { Interceptor } from "..";

export default {
  onRequest: async (options: RequestInit) => {
    options.body = JSON.stringify(options.body);
    return options;
  },
} as Interceptor;
