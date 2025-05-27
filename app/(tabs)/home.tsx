import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
<<<<<<< Updated upstream:app/(tabs)/home.tsx
=======
import { useEffect, useState } from 'react';
import { getPets } from '../../lib/api/pets';
const URL = 'http://localhost:3333/download/';

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
  foto_url: string;
};
>>>>>>> Stashed changes:src/(tabs)/home.tsx

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-4">
      {/* Cabeçalho com nome e botão */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' /* ou dark mode ajuste */ }}>Rod</Text>
        <TouchableOpacity
          onPress={() => router.push('/recommendation')}
          style={{
            backgroundColor: '#22c55e',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Recomendações</Text>
        </TouchableOpacity>
      </View>

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
<<<<<<< Updated upstream:app/(tabs)/home.tsx
        <TouchableOpacity onPress={() => router.push('/pet-details/rex')}>
          <PetCard
            nome="Rex"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "2 anos", "Dócil", "Pequeno", "Bom com Crianças"]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pet-details/mimi')}>
          <PetCard
            nome="Mimi"
            imagem="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
            tags={["Gato", "1 mês", "Curioso", "Pequeno"]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pet-details/thor')}>
          <PetCard
            nome="Thor"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "3 anos", "Brincalhão", "Médio"]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pet-details/luna')}>
          <PetCard
            nome="Luna"
            imagem="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
            tags={["Gata", "2 meses", "Carinhoso", "Pequeno"]}
          />
        </TouchableOpacity>
=======
        {pets.map((pet) => {
          const imageUrl = pet.foto_url
            ? `${URL}${pet.foto_url}`
            : 'https://via.placeholder.com/150';

          return (
            <TouchableOpacity key={pet._id} onPress={() => router.push(`/pet-details/${pet._id}`)}>
              <PetCard
                nome={pet.nome}
                imagem={imageUrl}
                tags={[
                  pet.especie,
                  `${pet.idade} anos`,
                  pet.porte,
                  pet.cidade,
                  pet.estado
                ]}
              />
            </TouchableOpacity>
          );
        })}
>>>>>>> Stashed changes:src/(tabs)/home.tsx
      </View>
    </ScrollView>
  );
}

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
