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

export default function HomeAdotanteScreen() {
  const [search, setSearch] = useState("");
  const [showAllFilters, setShowAllFilters] = useState(false);

  const pets = [
    {
      id: 1,
      nome: "Bolt",
      idade: "2 anos",
      porte: "Médio",
      local: "Recife - PE",
      filtros: ["Cachorro", "Carinhoso", "Bom com crianças"],
      ong: "Amigos de Pata",
      imagem: {
        uri: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972",
      },
    },
    {
      id: 2,
      nome: "Luna",
      idade: "1 ano",
      porte: "Pequeno",
      local: "Olinda - PE",
      filtros: ["Gato", "Independente", "Calmo"],
      ong: "Lar do Coração Animal",
      imagem: {
        uri: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030",
      },
    },
    {
      id: 3,
      nome: "Thor",
      idade: "3 anos",
      porte: "Grande",
      local: "Jaboatão - PE",
      filtros: ["Cachorro", "Protetor", "Bom com outros animais"],
      ong: "Projeto Patinhas Felizes",
      imagem: {
        uri: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=2000",
      },
    },
    {
      id: 4,
      nome: "Mimi",
      idade: "4 anos",
      porte: "Pequeno",
      local: "Paulista - PE",
      filtros: ["Gato", "Curioso", "Calmo"],
      ong: "Refúgio Animal",
      imagem: {
        uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2000",
      },
    },
  ];

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
          <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row items-center gap-4">
            <Image
              source={pet.imagem}
              className="w-36 h-36 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 gap-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-bold text-black">{pet.nome}</Text>
                <Text className="text-gray-500">• {pet.idade}</Text>
              </View>

              <View className="flex-row flex-wrap gap-2 items-center">
                {(showAllFilters ? pet.filtros : pet.filtros.slice(0, 2)).map(
                  (filtro, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-full"
                    >
                      <Text className="text-black text-xs">{filtro}</Text>
                    </View>
                  )
                )}
                {pet.filtros.length > 2 && (
                  <Ionicons
                    name={showAllFilters ? "remove-circle" : "add-circle"}
                    size={32}
                    color={colors.green}
                    onPress={() => setShowAllFilters(!showAllFilters)}
                  />
                )}
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
