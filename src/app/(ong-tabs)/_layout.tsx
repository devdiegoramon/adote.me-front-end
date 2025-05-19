import { View, Text, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter, usePathname } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  const path = usePathname();

  const tabs = [
    { name: "Novo Pet", route: "/pet-register" },
    { name: "Home", route: "/home" },
    { name: "Solicitações", route: "/requests" },
    { name: "Perfil", route: "/profile" },
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Stack>
          <Stack.Screen
            name="pet-register"
            options={{
              title: "Cadastro de Pet",
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              headerTitle: () => (
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ width: 160, height: 40, resizeMode: "contain" }}
                />
              ),
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="requests"
            options={{
              title: "Solicitações",
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              title: "Perfil",
            }}
          />
        </Stack>
      </View>

      <View className="flex-row justify-around bg-white py-3 border-t border-gray-200">
        {tabs.map((tab) => {
          const isActive = path === tab.route;
          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => router.push(tab.route)}
              className={`px-5 py-2 border-b-2 ${
                isActive ? "border-green-500" : "border-transparent"
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  isActive ? "text-green-500" : "text-black"
                }`}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
