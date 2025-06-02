import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SearchInput } from "../../components/SearchInput";
import { Title } from "../../components/Title";
import { getPetByOngId } from '../../../lib/api/pets';
import { API_BASE_URL } from '../../../lib/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipagem do Pet
type Pet = {
  _id: string;
  nome: string;
  especie: string;
  idade: number;
  porte: string;
  cidade: string;
  estado: string;
  sexo?: string;
  imagens?: string[];
  foto_url: string;
};

export default function HomeOngScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Buscar dados do usuário
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const userData = userJson ? JSON.parse(userJson) : null;
        setUser(userData);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do usuário:", error);
      }
    };

    getUserData();
  }, []);

  // Buscar pets quando tiver o usuário
  useEffect(() => {
    const fetchPets = async () => {
      if (!user?.user_id) return;

      try {
        setLoading(true);
        const data = await getPetByOngId(user.user_id);
        setPets(data || []);
      } catch (error) {
        console.error("❌ Erro ao buscar pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [user]);

  // Função para filtrar pets pela busca
  const filteredPets = pets.filter((pet) => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      pet.nome?.toLowerCase().includes(searchLower) ||
      pet.especie?.toLowerCase().includes(searchLower) ||
      pet.porte?.toLowerCase().includes(searchLower) ||
      pet.cidade?.toLowerCase().includes(searchLower) ||
      pet.estado?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white px-4 pt-4 justify-center items-center">
        <Text className="text-gray-500">Carregando pets...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Title
            greeting={`Olá, ${user?.nome || 'ONG'}!`}
            subtitle="Gerencie seus pets e acompanhe solicitações"
          />
        </View>

        {/* Search */}
        <View className="mb-4">
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Procure pelo nome do pet..."
          />
        </View>

        {/* Botão para adicionar novo pet */}
        <TouchableOpacity 
          onPress={() => router.push('/cadastro-pet')}
          className="bg-green-500 p-4 rounded-xl mb-6 flex-row items-center justify-center"
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text className="text-white font-semibold ml-2">Adicionar Novo Pet</Text>
        </TouchableOpacity>

        {/* Contador de Resultados */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-600">
            {filteredPets.length} pet{filteredPets.length !== 1 ? "s" : ""} 
            {search ? ` encontrado${filteredPets.length !== 1 ? "s" : ""}` : " cadastrado" + (filteredPets.length !== 1 ? "s" : "")}
          </Text>
          {search && (
            <Text className="text-green-600 text-sm">
              Buscando: "{search}"
            </Text>
          )}
        </View>

        {/* Lista de Pets */}
        <View className="pb-6">
          {filteredPets.length > 0 ? (
            <View className="space-y-4">
              {filteredPets.map((pet) => {
                const imageUrl = pet.foto_url
                  ? `${API_BASE_URL}/download/${pet.foto_url}`
                  : 'https://via.placeholder.com/150';

                return (
                  <TouchableOpacity
                    key={pet._id}
                    onPress={() => router.push(`/pet-details/${pet._id}`)}
                    className="mb-4"
                  >
                    <View className="bg-gray-100 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-52"
                        resizeMode="cover"
                      />
                      <View className="p-4">
                        <View className="flex-row justify-between items-start mb-2">
                          <Text className="text-lg font-bold text-black flex-1" numberOfLines={2}>
                            {pet.nome || "Nome não informado"}
                          </Text>
                          <TouchableOpacity
                            onPress={() => router.push(`/editar-pet/${pet._id}`)}
                            className="ml-2 bg-blue-100 p-2 rounded-lg"
                          >
                            <Ionicons name="pencil" size={16} color="#3b82f6" />
                          </TouchableOpacity>
                        </View>
                        
                        <View className="flex-row flex-wrap -m-1">
                          {[
                            pet.especie,
                            pet.idade ? `${pet.idade} anos` : null,
                            pet.porte,
                            pet.sexo,
                            pet.cidade,
                            pet.estado,
                          ]
                            .filter(Boolean)
                            .map((tag, index) => (
                              <View
                                key={index}
                                className="bg-gray-300 px-3 py-1 rounded-full m-1"
                              >
                                <Text className="text-xs text-black" numberOfLines={1}>
                                  {tag}
                                </Text>
                              </View>
                            ))}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center py-20">
              <Ionicons name="paw" size={64} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4 text-center">
                {search ? "Nenhum pet encontrado" : "Nenhum pet cadastrado"}
              </Text>
              <Text className="text-gray-400 text-center mt-2 px-4">
                {search 
                  ? `Nenhum resultado para "${search}"`
                  : "Comece adicionando seu primeiro pet"
                }
              </Text>
              {search ? (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                  className="bg-green-500 px-6 py-3 rounded-lg mt-6"
                >
                  <Text className="text-white font-medium">Limpar busca</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push('/cadastro-pet')}
                  className="bg-green-500 px-6 py-3 rounded-lg mt-6"
                >
                  <Text className="text-white font-medium">Adicionar Pet</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}