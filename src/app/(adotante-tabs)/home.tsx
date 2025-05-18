import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

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
        uri: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        uri: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        uri: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4 gap-6">
      <View>
        <Text className="text-2xl font-bold text-black">Olá, Rodrigo!</Text>
        <Text className="text-gray-500">Aqui estão alguns pets que combinam com você</Text>
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

      <View className="flex-row flex-wrap gap-2">
        <TouchableOpacity className="bg-green px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-sm">Cachorros</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-50 border-2 border-gray-200 px-4 py-2 rounded-full">
          <Text className="text-black text-sm">Gatos</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-50 border-2 border-gray-200 px-4 py-2 rounded-full">
          <Text className="text-black text-sm">Pequeno porte</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-50 border-2 border-gray-200 px-4 py-2 rounded-full">
          <Text className="text-black text-sm">Médio porte</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-50 border-2 border-gray-200 px-4 py-2 rounded-full">
          <Text className="text-black text-sm">Grande porte</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {pets.map((pet) => (
          <View
            key={pet.id}
            className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4"
          >
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

              <View className="flex-row flex-wrap gap-2">
                {pet.filtros.map((filtro, index) => (
                  <View key={index} className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-full">
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
