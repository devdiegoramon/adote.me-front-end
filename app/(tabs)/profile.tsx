import { View, Text, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Meu Perfil
      </Text>

      <TouchableOpacity style={{ backgroundColor: "#2ecc71", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Editar Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
