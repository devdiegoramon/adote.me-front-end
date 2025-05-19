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
import { Link } from "expo-router";

export default function HomeOngScreen() {
  const [search, setSearch] = useState("");

  const pets = [
    {
      id: 1,
      nome: "Bolt",
      idade: "2 anos",
      porte: "Médio",
      local: "Recife - PE",
      filtros: ["Cachorro", "Carinhoso", "Bom com crianças"],
      status: "Disponível",
      imagem: {
        uri: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop",
      },
    },
    {
      id: 2,
      nome: "Luna",
      idade: "1 ano",
      porte: "Pequeno",
      local: "Olinda - PE",
      filtros: ["Gato", "Independente", "Calmo"],
      status: "Pendente",
      imagem: {
        uri: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop",
      },
    },
  ];

  const renderPet = ({ item: pet }) => (
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
        <View className="flex-row items-center gap-2 justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold text-black">{pet.nome}</Text>
            <Text className="text-gray-500">• {pet.idade}</Text>
          </View>
          <View
            className={`px-2 py-1 rounded-full ${
              pet.status === "Disponível"
                ? "bg-blue-500"
                : pet.status === "Pendente"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            <Text className="text-xs font-bold text-white">{pet.status}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {pet.filtros.map((filtro, index) => (
            <View
              key={index}
              className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-full"
            >
              <Text className="text-black text-xs">{filtro}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4 gap-6">
      <View>
        <Text className="text-2xl font-bold text-black">
          Olá, Amigos de Pata!
        </Text>
        <Text className="text-gray-500">
          Gerencie seus pets e acompanhe solicitações
        </Text>
      </View>

      <View className="flex-row gap-2">
        <Link href="pet-register" asChild>
          <TouchableOpacity className="flex-1 bg-green px-4 py-4 rounded-xl items-center">
            <Text className="text-white font-bold">Cadastrar Novo Pet</Text>
          </TouchableOpacity>
        </Link>

        <Link href="requests" asChild>
          <TouchableOpacity className="flex-1 border-2 border-green px-4 py-4 rounded-xl items-center">
            <Text className="text-green font-bold">Ver Solicitações</Text>
          </TouchableOpacity>
        </Link>
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
        renderItem={renderPet}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
