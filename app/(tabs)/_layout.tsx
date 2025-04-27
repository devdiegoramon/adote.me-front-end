import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          // ícones para cada rota
          if (route.name === "index") {
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
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="paw-outline" size={24} color="#2ecc71" />
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Adote.<Text style={{ color: "#2ecc71" }}>me</Text>
            </Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Ionicons name="person-circle-outline" size={36} color="#333" />
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

        // organição das telas na barra de navegação
      <Tabs.Screen name="search" options={{ title: "Buscar" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="messages" options={{ title: "Mensagens" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favoritos" }} />
      
    </Tabs>
  );
}
