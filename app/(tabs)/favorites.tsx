import { View, Text } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Favoritos
      </Text>
      <Text>Você ainda não tem nenhum pet favorito.</Text>
    </View>
  );
}
