import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { getPetById } from "../../../../lib/api/pets";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../../lib/api';

type Pet = {
  _id: string;
  nome: string;
  especie: string;
  idade: number;
  porte: string;
  cidade: string;
  estado: string;
  imagens?: string[];
  foto_url: string;
  descricao: string;
  personalidades: string[];
  ong: string;
};

export default function PetDetailsScreen() {
  const [pet, setPet] = useState<Pet | null>(null);
  const { petId } = useLocalSearchParams();

  if (typeof petId !== "string") return null;

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const data = await getPetById(petId);
        setPet(data);
      } catch (error) {
        console.error("❌ Erro ao buscar detalhes do pet:", error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  const handleContato = () => {
    Alert.alert("Contato", "Um e-mail foi enviado para confirmação. Obrigado!");
  };

  if (!pet) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4" edges={[]}>
      <ScrollView className="flex-1 my-4" showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: pet.foto_url
                  ? `${API_BASE_URL}/download/${pet.foto_url}`
                  : 'https://via.placeholder.com/150',
          }}
          className="w-full h-64 rounded-xl mt-4 mb-6"
          resizeMode="cover"
        />

        <Title greeting={pet.nome} subtitle={pet.ong + pet.especie} />

        <View className="flex-row justify-center mb-6">
          <View className="flex-1 items-center">
            <Ionicons name="calendar" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Idade</Text>
            <Text className="text-lg font-semibold">{pet.idade} anos</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="resize" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Porte</Text>
            <Text className="text-lg font-semibold">{pet.porte}</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="location" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Local</Text>
            <Text className="text-lg font-semibold">
              {pet.cidade} - {pet.estado}
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Descrição</Text>
          <Text className="text-gray-800">{pet.descricao}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Características</Text>
          <View className="flex-row flex-wrap gap-2">
            {pet.personalidades.map((tag, index) => (
              <View
                key={index}
                className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-full"
              >
                <Text className="text-gray-800 text-sm">{tag}</Text>
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

        <Button text="Entrar em contato" onPress={handleContato} />
      </ScrollView>
    </SafeAreaView>
  );
}
