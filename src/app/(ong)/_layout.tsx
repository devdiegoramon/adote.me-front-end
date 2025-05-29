import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../styles/colors";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pet-register"
        options={{
          title: "Registrar Pet",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="paw" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Solicitações",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pet-details/[id]"
        options={{
          title: "Detalhes do Pet",
          href: null,
        }}
      />
    </Tabs>
  );
}
