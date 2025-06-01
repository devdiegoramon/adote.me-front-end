import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Link } from "expo-router";
import { getPets } from "../../../lib/api/pets"; // importa função de busca
import { API_BASE_URL } from '../../../lib/api';

type Pet = {
  _id: string;
  pet_id: number;
  nome: string;
  especie: string;
  porte: string;
  idade: number;
  peso: number;
  descricao: string;
  ong_id: number;
  foto_url: string;
  vacinado: boolean;
  castrado: boolean;
  vermifugado: boolean;
  microchipado: boolean;
  sexo?: string;
  raca_id: number;
  personalidades: number[];
  coordenadas: { latitude: number; longitude: number };
  cidade: string;
  estado: string;
  necessidades_especiais?: string | null;
  imagens: string[];
  status: {
    disponivel: boolean;
    destaque: boolean;
    data_cadastro: string;
    data_ultima_atualizacao: string;
  };
};

export default function HomeAdotanteScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.nome.toLowerCase().includes(search.toLowerCase())
  );

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
        data={filteredPets}
        keyExtractor={(item) => item.pet_id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: pet }) => (
          <Link href={`pet-details/${pet._id}`} asChild>
            <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4">
              <Image
                source={{ uri: `${API_BASE_URL}/download/${pet.foto_url}` }}
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
                      toggleFavorito(pet.pet_id);
                    }}
                  >
                    <Ionicons
                      name={
                        favoritos.includes(pet.pet_id)
                          ? "heart"
                          : "heart-outline"
                      }
                      size={24}
                      color={colors.green}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap gap-1">
                  {[pet.especie, pet.porte, pet.cidade, pet.estado].map((tag, idx) => (
                    <View
                      key={idx}
                      className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-full"
                    >
                      <Text className="text-black text-xs">{tag}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center gap-2">
                  <Ionicons name="location" size={16} color={colors.green} />
                  <Text className="text-gray-500 text-sm">
                    {pet.cidade}, {pet.estado}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
