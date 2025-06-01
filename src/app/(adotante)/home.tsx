import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import { SearchInput } from "../../components/SearchInput";
import { getPets } from "../../../lib/api/pets";

const URL = "http://localhost:3000/download/";

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

export default function HomeAdotanteScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.error("❌ Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4 gap-6" edges={["top"]}>
      <Title
        greeting="Olá, Rodrigo"
        subtitle="Aqui estão alguns pets que combinam com você"
      />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Procure pelo nome do pet..."
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-y-4 pb-10">
          {filteredPets.map((pet) => {
            const imageUrl = pet.foto_url
              ? `${URL}${pet.foto_url}`
              : "https://via.placeholder.com/150";

            return (
              <TouchableOpacity
                key={pet._id}
                onPress={() => router.push(`/pet-details/${pet._id}`)}
              >
                <PetCard
                  nome={pet.nome}
                  imagem={imageUrl}
                  tags={[
                    pet.especie,
                    `${pet.idade} anos`,
                    pet.porte,
                    pet.cidade,
                    pet.estado,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PetCard({
  nome,
  imagem,
  tags,
}: {
  nome: string;
  imagem: string;
  tags: string[];
}) {
  return (
    <View className="bg-gray-100 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
      <Image
        source={{ uri: imagem }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-black mb-2">{nome}</Text>
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-gray-300 px-2 py-1 rounded-full mr-1 mb-1"
            >
              <Text className="text-xs text-black">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
