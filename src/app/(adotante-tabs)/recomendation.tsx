import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

// URL base para imagens
const URL = 'http://localhost:3333/download/';

// Tipagem do Pet recomendação
type Pet = {
  pet_id: string;
  nome: string;
  especie: string;
  idade_pet: number;
  porte_pet_grande: number;
  porte_pet_medio: number;
  porte_pet_pequeno: number;
  cidade: string;
  estado: string;
  imagens: string[];
  probabilidade: number;
  descricao: string;
};

async function getRecommendations(): Promise<Pet[]> {
  // Aqui você deve implementar a chamada real para seu backend que retorna as recomendações
  // Exemplo:
  const response = await fetch('http://localhost:3333/api/recomendacoes');
  const data = await response.json();
  return data;
}

export default function RecommendationScreen() {
  const [recomendacoes, setRecomendacoes] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        setRecomendacoes(data);
      } catch (error) {
        console.error("❌ Erro ao buscar recomendações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#2ecc71" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-4">
      <Text className="text-2xl font-bold mb-4 text-black dark:text-white">Recomendações Personalizadas</Text>

      <View className="space-y-4">
        {recomendacoes.map((pet) => {
          // Definir porte baseado nos flags
          let porte = 'Desconhecido';
          if (pet.porte_pet_grande) porte = 'Grande';
          else if (pet.porte_pet_medio) porte = 'Médio';
          else if (pet.porte_pet_pequeno) porte = 'Pequeno';

          const imageUrl = pet.imagens && pet.imagens.length > 0
            ? `${URL}${pet.imagens[0]}`
            : 'https://via.placeholder.com/150';

          return (
            <TouchableOpacity key={pet.pet_id} onPress={() => router.push(`/pet-details/${pet.pet_id}`)}>
              <PetCard
                nome={pet.nome}
                imagem={imageUrl}
                tags={[
                  pet.especie,
                  `${pet.idade_pet} anos`,
                  porte,
                  pet.cidade,
                  pet.estado,
                  `Match: ${(pet.probabilidade * 100).toFixed(1)}%`
                ]}
                descricao={pet.descricao}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

function PetCard({ nome, imagem, tags, descricao }: { nome: string; imagem: string; tags: string[]; descricao: string }) {
  return (
    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
      <Image
        source={{ uri: imagem }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-black dark:text-white mb-2">{nome}</Text>
        <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2" numberOfLines={3}>{descricao}</Text>
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-full mr-1 mb-1"
            >
              <Text className="text-xs text-black dark:text-white">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}