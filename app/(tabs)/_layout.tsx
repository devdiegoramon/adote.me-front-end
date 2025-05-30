import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Logo } from "~/components/base/Logo";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          // Ícones para cada rota
          if (route.name === "home") {
            iconName = "home-outline";
          } else if (route.name === "search") {
            iconName = "search-outline";
          } else if (route.name === "favorites") {
            iconName = "heart-outline";
          } else if (route.name === "profile") {
            iconName = "person-outline";
          } else if (route.name === "messages") {
            iconName = "chatbox-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2ecc71",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        
        // Header
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Logo size={150} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="settings-outline" size={32} color="#333" />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      })}
    >
      {/* Organização das telas na barra de navegação */}
      <Tabs.Screen name="search" options={{ title: "Buscar" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="messages" options={{ title: "Mensagens" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favoritos" }} />
    </Tabs>
  );
}
