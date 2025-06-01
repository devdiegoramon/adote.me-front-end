import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Title } from "../../components/Title";
import { SearchInput } from "../../components/SearchInput";
import { getPets } from "../../../lib/api/pets";

const URL = "http://192.168.0.104:3000/download/";

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

type FilterType = {
  especie: string[];
  porte: string[];
  idade: string[];
  sexo: string[];
};

export default function HomeAdotanteScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType>({
    especie: [],
    porte: [],
    idade: [],
    sexo: [],
  });

  // Opções de filtros atualizadas
  const filterOptions = {
    especie: ["Cachorro", "Gato"],
    porte: ["Pequeno", "Médio", "Grande"],
    idade: [
      "Filhote (0-1 ano)",
      "Jovem (1-3 anos)",
      "Adulto (3-7 anos)",
      "Idoso (7+ anos)",
    ],
    sexo: ["Macho", "Fêmea"],
  };

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

  // Função para determinar categoria de idade
  const getIdadeCategoria = (idade: number): string => {
    if (idade <= 1) return "Filhote (0-1 ano)";
    if (idade <= 3) return "Jovem (1-3 anos)";
    if (idade <= 7) return "Adulto (3-7 anos)";
    return "Idoso (7+ anos)";
  };

  // Função segura para verificar se string contém texto
  const safeIncludes = (text: any, search: string): boolean => {
    if (!text) return false;
    return String(text).toLowerCase().includes(search.toLowerCase());
  };

  // Função para alternar filtros
  const toggleFilter = (category: keyof FilterType, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setActiveFilters({
      especie: [],
      porte: [],
      idade: [],
      sexo: [],
    });
  };

  // Contar filtros ativos
  const activeFiltersCount = Object.values(activeFilters).flat().length;

  // Filtrar pets usando a mesma lógica da pesquisa
  const filteredPets = pets.filter((pet) => {
    // Verificar se o pet tem as propriedades necessárias
    if (!pet || !pet.nome) return false;

    // Pesquisa por texto (mesma lógica original)
    const searchLower = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      safeIncludes(pet.nome, searchLower) ||
      safeIncludes(pet.especie, searchLower) ||
      safeIncludes(pet.porte, searchLower) ||
      safeIncludes(pet.cidade, searchLower) ||
      safeIncludes(pet.estado, searchLower) ||
      safeIncludes(pet.sexo, searchLower) ||
      safeIncludes(pet.idade?.toString(), searchLower);

    // Filtros usando a mesma lógica de includes
    const matchesEspecie =
      activeFilters.especie.length === 0 ||
      activeFilters.especie.some(
        (filtro) =>
          safeIncludes(pet.especie, filtro) ||
          (filtro === "Cachorro" && safeIncludes(pet.especie, "cão"))
      );

    const matchesPorte =
      activeFilters.porte.length === 0 ||
      activeFilters.porte.some((filtro) => safeIncludes(pet.porte, filtro));

    const matchesIdade =
      activeFilters.idade.length === 0 ||
      activeFilters.idade.some((filtro) => {
        const petIdadeCategoria = getIdadeCategoria(pet.idade || 0);
        return (
          safeIncludes(petIdadeCategoria, filtro) ||
          safeIncludes(filtro, petIdadeCategoria)
        );
      });

    const matchesSexo =
      activeFilters.sexo.length === 0 ||
      activeFilters.sexo.some((filtro) => safeIncludes(pet.sexo, filtro));

    return (
      matchesSearch &&
      matchesEspecie &&
      matchesPorte &&
      matchesIdade &&
      matchesSexo
    );
  });

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
            greeting="Olá!"
            subtitle="Aqui estão alguns pets que combinam com você"
          />
        </View>

        {/* Search */}
        <View className="mb-4">
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Busque por nome, espécie, cidade, porte..."
          />
        </View>

        {/* Botão de Filtros */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="flex-row items-center bg-green-100 px-4 py-3 rounded-lg flex-1 mr-3"
          >
            <Ionicons name="filter" size={20} color="#22c55e" />
            <Text className="ml-2 text-green-700 font-medium flex-1">
              Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Text>
            <Ionicons
              name={showFilters ? "chevron-up" : "chevron-down"}
              size={16}
              color="#22c55e"
            />
          </TouchableOpacity>

          {activeFiltersCount > 0 && (
            <TouchableOpacity
              onPress={clearAllFilters}
              className="bg-red-100 px-4 py-3 rounded-lg"
            >
              <Text className="text-red-600 text-sm font-medium">Limpar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Painel de Filtros */}
        {showFilters && (
          <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
            {Object.entries(filterOptions).map(([category, options]) => (
              <View key={category} className="mb-4 last:mb-0">
                <Text className="text-base font-semibold text-gray-800 mb-3">
                  {category === "especie"
                    ? "Espécie"
                    : category === "sexo"
                    ? "Sexo"
                    : category === "idade"
                    ? "Idade"
                    : "Porte"}
                </Text>
                <View className="flex-row flex-wrap -m-1">
                  {options.map((option) => {
                    const isActive =
                      activeFilters[category as keyof FilterType].includes(
                        option
                      );
                    return (
                      <View key={option} className="m-1">
                        <TouchableOpacity
                          onPress={() =>
                            toggleFilter(category as keyof FilterType, option)
                          }
                          className={`px-4 py-2 rounded-full border min-w-0 ${
                            isActive
                              ? "bg-green-500 border-green-500"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          <Text
                            className={`text-sm font-medium text-center ${
                              isActive ? "text-white" : "text-gray-700"
                            }`}
                            numberOfLines={1}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Filtros Ativos (Tags) */}
        {activeFiltersCount > 0 && (
          <View className="mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <View className="flex-row">
                {Object.entries(activeFilters).map(([category, values]) =>
                  values.map((value, index) => (
                    <View
                      key={`${category}-${value}`}
                      className="bg-green-100 border border-green-200 px-3 py-2 rounded-full flex-row items-center mr-2"
                    >
                      <Text
                        className="text-green-700 text-sm mr-1"
                        numberOfLines={1}
                      >
                        {value}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          toggleFilter(category as keyof FilterType, value)
                        }
                        className="ml-1"
                      >
                        <Ionicons name="close" size={14} color="#22c55e" />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Contador de Resultados */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-600 flex-1">
            {filteredPets.length} pet{filteredPets.length !== 1 ? "s" : ""}{" "}
            encontrado{filteredPets.length !== 1 ? "s" : ""}
          </Text>

          {/* Indicador de pesquisa ativa */}
          {search && (
            <Text
              className="text-green-600 text-sm flex-shrink-0 ml-2"
              numberOfLines={1}
            >
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
                  ? `${URL}${pet.foto_url}`
                  : "https://via.placeholder.com/150";

                return (
                  <TouchableOpacity
                    key={pet._id}
                    onPress={() => router.push(`/pet-details/${pet._id}`)}
                    className="mb-4"
                  >
                    <PetCard
                      nome={pet.nome || "Nome não informado"}
                      imagem={imageUrl}
                      tags={[
                        pet.especie || "",
                        pet.idade ? `${pet.idade} anos` : "",
                        pet.porte || "",
                        pet.sexo || "",
                        pet.cidade || "",
                        pet.estado || "",
                      ].filter(Boolean)}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center py-20">
              <Ionicons name="search" size={64} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4 text-center">
                Nenhum pet encontrado
              </Text>
              <Text className="text-gray-400 text-center mt-2 px-4">
                {search
                  ? `Nenhum resultado para "${search}"`
                  : "Tente ajustar os filtros ou fazer uma busca"}
              </Text>
              {(search || activeFiltersCount > 0) && (
                <TouchableOpacity
                  onPress={() => {
                    setSearch("");
                    clearAllFilters();
                  }}
                  className="bg-green-500 px-6 py-3 rounded-lg mt-6"
                >
                  <Text className="text-white font-medium">Limpar tudo</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
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
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3" numberOfLines={2}>
          {nome}
        </Text>
        <View className="flex-row flex-wrap -m-1">
          {tags.map((tag, index) => (
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
  );
}
