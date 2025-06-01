import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { colors } from "../../../styles/colors";
import { getPetById }  from "../../../../lib/api/pets"; 
import { API_BASE_URL } from '../../../../lib/api';


type Pet = {
  _id: string;
  pet_id: number;
  nome: string;
  especie: string;
  porte: string;
  idade: number;
  peso: number;
  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  microchipado: boolean;
  sociavelCaes: boolean;
  sociavelGatos: boolean;
  sociavelCriancas: boolean;
  nivelEnergia: string;
  raca_id: number;
  personalidades: number[];
  ong_id: number;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  cidade: string;
  estado: string;
  descricao: string;
  necessidades_especiais: string;
  imagens: string[];
  status: {
    disponivel: boolean;
    destaque: boolean;
    data_cadastro: string;
    data_ultima_atualizacao: string;
  };
  foto_url: string;
};


export default function PetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      try {
        const data = await getPetById(id);
        console.log(data)
        setPet(data);
      } catch (error) {
        console.error("Erro ao buscar pet:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do pet.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.green} />
      </SafeAreaView>
    );
  }

  if (!pet) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Pet não encontrado.</Text>
        <Link href="/" asChild>
          <Text className="text-blue-600 mt-4">Voltar para a lista</Text>
        </Link>
      </SafeAreaView>
    );
  }

  const handleContato = () => {
    Alert.alert(
  "Contato",
  `Entrando em contato com a ONG "${pet.ong_id}" para adoção do(a) ${pet.nome}.`
);

  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: `${API_BASE_URL}/download/${pet.foto_url}` }}
          className="w-full h-64 rounded-xl mt-4 mb-6"
          resizeMode="cover"
        />

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-3xl font-bold text-black">{pet.nome}</Text>

          <TouchableOpacity onPress={() => setFavorito((f) => !f)}>
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={30}
              color={colors.green}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 mb-1">{pet.ong_id}</Text>


        <View className="flex-row justify-center mb-6">
          <View className="flex-1 items-center">
            <Ionicons name="calendar" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Idade</Text>
            <Text className="text-lg font-semibold">{pet.idade}</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="resize" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Porte</Text>
            <Text className="text-lg font-semibold">{pet.porte}</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="location" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Local</Text>
            <Text className="text-lg font-semibold">{"local"}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Descrição</Text>
          <Text className="text-gray-800">{pet.descricao}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Características</Text>
          <View className="flex-row flex-wrap gap-2">
            {pet.personalidades.map((filtro, index) => (
              <View
                key={index}
                className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-full"
              >
                <Text className="text-gray-800 text-sm">{filtro}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 flex-row gap-8 justify-center">
          <View className="items-center">
            <Ionicons name="medkit" size={28} color={colors.green} />
            <Text className="text-green-600 font-semibold mt-1">
              Vacinas em dia
            </Text>
          </View>
          <View className="items-center">
            <Ionicons name="paw" size={28} color={colors.green} />
            <Text className="text-green-600 font-semibold mt-1">Castrado</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleContato}
          className="bg-green px-6 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">
            Entrar em contato
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
