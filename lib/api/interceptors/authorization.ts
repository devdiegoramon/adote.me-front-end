import AsyncStorage from "@react-native-async-storage/async-storage";
import { Interceptor } from "..";

export default {
  onRequest: async (options: RequestInit) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return options;
  },
} as Interceptor;
