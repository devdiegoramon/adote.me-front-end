import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, Interceptor } from "..";
import { router } from "expo-router";

//handle token refresh logic here
export default {
  onResponse(response, retryCB) {
    if (response.status === 401) {
      console.log("Refresh token interceptor triggered");
      return AsyncStorage.getItem("token")
        .then((refreshToken) => {
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }
          return fetch(`${API_BASE_URL}/auth/token/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
        })
        .then((res) => {
          if (!res.ok) {
            console.log("Failed to refresh token");
            AsyncStorage.removeItem("token").then(() =>
              router.replace("/(auth)/login")
            );
            throw new Error("Failed to refresh token");
          }
          return res.json();
        })
        .then((data) => {
          return AsyncStorage.setItem("token", data.token).then(() => {
            return retryCB();
          });
        });
    }
    return response;
  },
} as Interceptor;
