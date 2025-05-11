import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPets } from '../../lib/api/pets';

// Tipagem do Pet
type Pet = {
  _id: string;
  nome: string;
  especie: string;
  idade: number;
  porte: string;
  cidade: string;
  estado: string;
  imagens?: string[];
};

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);  // tipando o estado
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data); // salva os pets recebidos
      } catch (error) {
        console.error("❌ Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-4">
      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {["Pequenos", "Cães", "Gatos", "Grandes", "Macho", "Fêmea"].map((categoria, index) => (
          <TouchableOpacity
            key={index}
            className="bg-emerald-100 dark:bg-emerald-900 py-2 px-4 rounded-full mr-2"
          >
            <Text className="text-emerald-500 dark:text-emerald-200 font-bold">{categoria}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards dos pets */}
      <View className="space-y-4">
  {pets.map((pet) => (
    <TouchableOpacity key={pet._id} /* onPress={() => router.push(`/pet-details/${pet._id}`)} */>
      <PetCard
        nome={pet.nome}
              imagem={pet.imagens?.[0] || 'https://via.placeholder.com/150'}
              tags={[
                pet.especie,
                `${pet.idade} anos`,
                pet.porte,
                pet.cidade,
                pet.estado
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// PetCard
function PetCard({ nome, imagem, tags }: { nome: string; imagem: string; tags: string[] }) {
  return (
    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
      <Image
        source={{ uri: imagem }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-black dark:text-white mb-2">{nome}</Text>
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