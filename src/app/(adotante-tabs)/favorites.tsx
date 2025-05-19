import { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { mockAdotante } from "../mock/adotante";
import { mockPets } from "../mock/pets";

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState(
    mockPets.filter((pet) => mockAdotante.favoritos.includes(pet.id))
  );

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((pet) => pet.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4 gap-6">
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            Nenhum pet favoritado.
          </Text>
        }
        renderItem={({ item: pet }) => (
          <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4">
            <Image
              source={pet.imagem}
              className="w-36 h-36 rounded-xl"
              resizeMode="cover"
            />

            <View className="flex-1 gap-2">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg font-bold text-black">
                    {pet.nome}
                  </Text>
                  <Text className="text-gray-500">• {pet.idade}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorito(pet.id)}>
                  <Ionicons name="heart" size={24} color={colors.green} />
                </TouchableOpacity>
              </View>

              <View className="flex-row overflow-hidden">
                {pet.filtros.map((filtro, index) => (
                  <View
                    key={index}
                    className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-full"
                  >
                    <Text className="text-black text-xs">{filtro}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center gap-2">
                <Ionicons name="home" size={16} color={colors.green} />
                <Text className="text-gray-500 text-sm">{pet.ong}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location" size={16} color={colors.green} />
                <Text className="text-gray-500 text-sm">{pet.local}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
