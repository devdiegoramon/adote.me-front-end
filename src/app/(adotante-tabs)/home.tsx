import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { mockPets } from "../mock/pets";
import { Link } from "expo-router";

export default function HomeAdotanteScreen() {
  const [pets, setPets] = useState(mockPets);

  const [search, setSearch] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]); // IDs dos pets curtidos

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4 gap-6">
      <View>
        <Text className="text-2xl font-bold text-black">Olá, Rodrigo!</Text>
        <Text className="text-gray-500">
          Aqui estão alguns pets que combinam com você
        </Text>
      </View>

      <View className="flex-row items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 gap-2">
        <Ionicons name="search" size={20} color={colors.black} />
        <TextInput
          className="w-full placeholder:text-gray-400"
          placeholder="Buscar por nome, raça..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: pet }) => (
          <Link href={`pet-details/${pet.id}`} asChild>
            <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4">
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
                  <TouchableOpacity
                    onPress={(e) => {
                      e.preventDefault();
                      toggleFavorito(pet.id);
                    }}
                  >
                    <Ionicons
                      name={
                        favoritos.includes(pet.id) ? "heart" : "heart-outline"
                      }
                      size={24}
                      color={colors.green}
                    />
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
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
